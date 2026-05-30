/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo, type ChangeEvent } from "react";
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  type Resolver,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getAllCategorias } from "@/services/categoria";
import { getMarcas } from "@/services/marca";
import { Categoria } from "@/types/categoria/categoria";
import { ProductoRequest } from "@/types/producto/productoList";
import { Marca } from "@/types/marca/marca";
import { upLoadImage } from "@/supabaseCredentials";
import { createProducto } from "@/services/producto";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

// Validación flexible: Obligatoria solo si no hay una URL previa (Edición)
const schemaImagenOpcional = z
  .any()
  .optional()
  .refine(
    (files) => !files || files.length === 0 || files.length === 1,
    "Solo se permite una imagen",
  )
  .refine(
    (files) => !files || files.length === 0 || files[0]?.size <= MAX_FILE_SIZE,
    "El tamaño máximo es de 5MB",
  )
  .refine(
    (files) =>
      !files ||
      files.length === 0 ||
      ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
    "Solo formatos .jpg, .jpeg, .png y .webp",
  );

const caracteristicaSchema = z.object({
  atributoNombre: z.string().min(1, "El atributo es obligatorio"),
  valorTexto: z.string().min(1, "El valor es obligatorio"),
});

const variacionSchema = z.object({
  codigoInventario: z.string().min(1, "El SKU es obligatorio"),
  precio: z.coerce.number().positive("El precio debe ser mayor a 0"),
  stock: z.coerce.number().int().min(0, "El stock no puede ser negativo"),
  imagenArchivo: schemaImagenOpcional,
  caracteristicas: z.array(caracteristicaSchema),
  isNewInDb: z.boolean().default(false),
});

const formSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, "Formato de slug inválido (ej: mi-marca-123)"),
  descripcion: z.string().min(1, "La descripción es obligatoria"),
  imagenArchivo: schemaImagenOpcional,
  categoriaPadreId: z.string().min(1, "Categoría principal obligatoria"),
  categoriaHijaId: z.string().min(1, "Subcategoría obligatoria"),
  categoriaId: z.coerce
    .number()
    .int()
    .positive("La subcategoría final es obligatoria"),
  marcaId: z.coerce.number().int().positive("Marca obligatoria"),
  estado: z.boolean().default(true),
  variaciones: z
    .array(variacionSchema)
    .min(1, "Debe tener al menos una variación"),
});

// CAMBIO CLAVE: Usamos infer en lugar de input para que los tipos coerced sean number
export type FormValues = z.infer<typeof formSchema>;

interface UseProductoFormProps {
  initialData?: ProductoRequest;
  isEdit: boolean;
  onUpdate?: (data: ProductoRequest) => void | Promise<string>;
}

export const useProductoForm = ({
  initialData,
  isEdit,
  onUpdate,
}: UseProductoFormProps) => {
  const [categoriasData, setCategoriasData] = useState<Categoria[]>([]);
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [mainPreview, setMainPreview] = useState<string | null>(null);
  const [variantPreviews, setVariantPreviews] = useState<
    Record<number, string>
  >({});

  const form = useForm<FormValues>({
    // Cast resolver para evitar incompatibilidades de tipos entre instalaciones
    // de `react-hook-form` o diferencias en los tipos inferidos por zodResolver.
    resolver: zodResolver(formSchema) as unknown as Resolver<FormValues>,
    defaultValues: {
      nombre: "",
      slug: "",
      descripcion: "",
      categoriaPadreId: "",
      categoriaHijaId: "",
      categoriaId: undefined,
      marcaId: undefined,
      estado: true,
      variaciones: [
        {
          codigoInventario: "",
          precio: 0,
          stock: 0,
          imagenArchivo: undefined,
          caracteristicas: [],
          isNewInDb: false,
        },
      ],
    },
  });

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control: form.control,
    name: "variaciones",
  });

  // Escuchamos cambios en la cascada para limpiar limpiamente los hijos caídos
  const padreIdSeleccionado = form.watch("categoriaPadreId");
  const hijaIdSeleccionada = form.watch("categoriaHijaId");

  // Resetear selectores dependientes cuando cambia el padre
  useEffect(() => {
    if (form.formState.isDirty || isEdit) {
      // Evita dispararse en la primera carga asíncrona de edición
      const currentHija = form.getValues("categoriaHijaId");
      if (
        currentHija &&
        !opcionesHija.some((h) => String(h.id) === currentHija)
      ) {
        form.setValue("categoriaHijaId", "");
        form.setValue("categoriaId", undefined as unknown as number);
      }
    }
  }, [padreIdSeleccionado]);

  // Resetear selector dependiente cuando cambia la hija
  useEffect(() => {
    if (form.formState.isDirty || isEdit) {
      const currentNieta = form.getValues("categoriaId");
      if (currentNieta && !opcionesNieta.some((n) => n.id === currentNieta)) {
        form.setValue("categoriaId", undefined as unknown as number);
      }
    }
  }, [hijaIdSeleccionada]);

  // 1. Carga inicial de catálogos
  useEffect(() => {
    const cargarDatosIniciales = async () => {
      try {
        setIsLoading(true);
        const [resCats, resMarcas] = await Promise.all([
          getAllCategorias(),
          getMarcas(),
        ]);
        setCategoriasData(resCats.data || []);
        setMarcas(resMarcas.data || []);
      } catch (error) {
        console.error("Error al cargar catálogos del formulario:", error);
      } finally {
        setIsLoading(false);
      }
    };
    cargarDatosIniciales();
  }, []);

  // 2. Hidratación en modo Edición
  useEffect(() => {
    if (isEdit && initialData && categoriasData.length > 0) {
      let padreId = "";
      let hijaId = "";
      const nietaId = initialData.categoriaId;

      for (const padre of categoriasData) {
        if (padre.subcategorias) {
          for (const hija of padre.subcategorias) {
            if (hija.subcategorias?.some((nieta) => nieta.id === nietaId)) {
              padreId = String(padre.id);
              hijaId = String(hija.id);
              break;
            }
          }
        }
        if (padreId) break;
      }

      form.reset({
        nombre: initialData.nombre,
        slug: initialData.slug,
        descripcion: initialData.descripcion,
        categoriaPadreId: padreId,
        categoriaHijaId: hijaId,
        categoriaId: nietaId,
        marcaId: initialData.marcaId,
        estado: true,
        variaciones: initialData.variaciones.map((v) => ({
          codigoInventario: v.codigoInventario,
          precio: v.precio,
          stock: v.stock,
          caracteristicas: v.caracteristicas,
          isNewInDb: false,
        })),
      });

      if (initialData.imagenUrl) setMainPreview(initialData.imagenUrl);

      const existingPreviews: Record<number, string> = {};
      initialData.variaciones?.forEach((v, idx) => {
        if (v.imagenUrl) existingPreviews[idx] = v.imagenUrl;
      });
      setVariantPreviews(existingPreviews);
    }
  }, [initialData, isEdit, categoriasData]);

  // Filtros en Cascada (useMemo)
  const opcionesPadre = categoriasData;

  const opcionesHija = useMemo(() => {
    if (!padreIdSeleccionado) return [];
    return (
      categoriasData.find((c) => String(c.id) === padreIdSeleccionado)
        ?.subcategorias || []
    );
  }, [padreIdSeleccionado, categoriasData]);

  const opcionesNieta = useMemo(() => {
    if (!hijaIdSeleccionada) return [];
    return (
      opcionesHija.find((c) => String(c.id) === hijaIdSeleccionada)
        ?.subcategorias || []
    );
  }, [hijaIdSeleccionada, opcionesHija]);

  // Manejo de imágenes (Previews)
  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (...event: unknown[]) => void,
    type: "main" | "variant",
    index?: number,
  ) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onChange(files);
      const fileUrl = URL.createObjectURL(files[0]);

      if (type === "main") {
        setMainPreview(fileUrl);
      } else if (type === "variant" && typeof index === "number") {
        setVariantPreviews((prev) => ({ ...prev, [index]: fileUrl }));
      }
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    // Validación manual si es creación y no hay preview
    if (!isEdit && !mainPreview) {
      form.setError("imagenArchivo", {
        message: "La imagen principal es requerimiento en nuevos productos",
      });
      return;
    }

    try {
      setIsLoading(true);

      // 1. Subir la imagen principal (si el usuario seleccionó un archivo nuevo)
      let finalMainImageUrl = initialData?.imagenUrl || "";

      if (values.imagenArchivo && values.imagenArchivo.length > 0) {
        // Usamos tu helper pasándole: el File, el bucket 'productos' y la carpeta 'principales'
        const urlSubida = await upLoadImage(
          values.imagenArchivo[0],
          "product-img",
          "principales",
        );
        if (urlSubida) finalMainImageUrl = urlSubida;
      }

      // 2. Procesar y subir las imágenes de las variaciones en paralelo usando tu helper
      const variacionesProcesadas = await Promise.all(
        values.variaciones.map(async (v, idx) => {
          // Mantiene la URL histórica si no se cambia la imagen en edición
          let finalVariantImageUrl =
            initialData?.variaciones?.[idx]?.imagenUrl || "";

          // Si esta variación tiene un archivo cargado en su input
          if (v.imagenArchivo && v.imagenArchivo.length > 0) {
            const urlSubida = await upLoadImage(
              v.imagenArchivo[0],
              "product-img",
              "variaciones",
            );
            if (urlSubida) finalVariantImageUrl = urlSubida;
          }

          return {
            codigoInventario: v.codigoInventario,
            precio: v.precio,
            stock: v.stock,
            imagenUrl: finalVariantImageUrl, // URL pública final lista
            caracteristicas: v.caracteristicas.map((c) => ({
              atributoNombre: c.atributoNombre,
              valorTexto: c.valorTexto,
            })),
          };
        }),
      );

      // 3. Estructurar el Payload final para Spring Boot
      const productoPayload: ProductoRequest = {
        nombre: values.nombre,
        slug: values.slug,
        descripcion: values.descripcion,
        imagenUrl: finalMainImageUrl,
        categoriaId: values.categoriaId,
        marcaId: values.marcaId,
        variaciones: variacionesProcesadas,
      };

      // 4. Enviar a tus servicios de backend de Spring Boot
      if (isEdit && onUpdate) {
        await onUpdate(productoPayload);
      } else if (!isEdit && createProducto) {
        await createProducto(productoPayload);
      }
    } catch (error) {
      console.error(
        "Error crítico al procesar el formulario de productos:",
        error,
      );
      alert("Hubo un error al subir las imágenes o registrar el producto.");
    } finally {
      setIsLoading(false);
    }
  };

  // El submit handler que se expone al componente ya viene con la firma correcta para react-hook-form
  const submitHandler: ReturnType<typeof form.handleSubmit> =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form.handleSubmit(onSubmit as unknown as SubmitHandler<any>);

  const handleRemoveVariant = (index: number) => {
    if (!isEdit && variantFields.length === 1) return;
    removeVariant(index);
    setVariantPreviews((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  };

  return {
    form,
    onSubmit: submitHandler,
    isLoading,
    marcas,
    opcionesPadre,
    opcionesHija,
    opcionesNieta,
    mainPreview,
    variantPreviews,
    variantFields,
    appendVariant,
    handleRemoveVariant,
    handleImageChange,
  };
};
