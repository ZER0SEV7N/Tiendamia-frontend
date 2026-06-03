/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { ProductoRequest } from "@/types/producto/productoList"; // Asegúrate de que apunte a tus tipos nuevos
import { Marca } from "@/types/marca/marca";
import { upLoadImage } from "@/supabaseCredentials";
import {
  createProducto,
  getProductoById,
  updateProducto,
  createVariacion,
  updateVariacion,
} from "@/services/producto";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

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

export type FormValues = z.infer<typeof formSchema>;

interface UseProductoFormProps {
  productoId?: string;
  isEdit: boolean;
  onSuccess?: () => void;
}

export const useProductoForm = ({
  productoId,
  isEdit,
  onSuccess,
}: UseProductoFormProps) => {
  const [categoriasData, setCategoriasData] = useState<Categoria[]>([]);
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [skusOriginales, setSkusOriginales] = useState<string[]>([]);
  const [urlImagenMaestraOriginal, setUrlImagenMaestraOriginal] =
    useState<string>("");
  const [urlsVariacionesOriginales, setUrlsVariacionesOriginales] = useState<
    Record<string, string>
  >({});

  const [mainPreview, setMainPreview] = useState<string | null>(null);
  const [variantPreviews, setVariantPreviews] = useState<
    Record<number, string>
  >({});

  const form = useForm<FormValues>({
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

  const padreIdSeleccionado = form.watch("categoriaPadreId");
  const hijaIdSeleccionada = form.watch("categoriaHijaId");

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

  useEffect(() => {
    if (form.formState.isDirty || isEdit) {
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

  useEffect(() => {
    if (form.formState.isDirty || isEdit) {
      const currentNieta = form.getValues("categoriaId");
      if (currentNieta && !opcionesNieta.some((n) => n.id === currentNieta)) {
        form.setValue("categoriaId", undefined as unknown as number);
      }
    }
  }, [hijaIdSeleccionada]);

  const cargarMarcas = async () => {
    try {
      const resMarcas = await getMarcas();
      setMarcas(resMarcas.data || []);
    } catch (error) {
      console.error("Error al refrescar las marcas:", error);
    }
  };

  useEffect(() => {
    const cargarTodo = async () => {
      try {
        setIsLoading(true);
        // Ejecutamos ambas peticiones en paralelo de forma limpia
        const [resCats, resMarcas] = await Promise.all([
          getAllCategorias(),
          getMarcas(),
        ]);
        // Seteamos los estados correspondientes con las respuestas
        const cats = resCats.data || [];
        setCategoriasData(cats);
        setMarcas(resMarcas.data || []);
        // Si es modo edición, procesamos el detalle del producto
        if (isEdit && productoId) {
          const productoDetalle = await getProductoById(productoId);

          if (productoDetalle) {
            setUrlImagenMaestraOriginal(productoDetalle.imagenUrl || "");
            if (productoDetalle.imagenUrl)
              setMainPreview(productoDetalle.imagenUrl);

            const skus: string[] = [];
            const urlsOriginalesVar: Record<string, string> = {};
            const existingPreviews: Record<number, string> = {};

            productoDetalle.variaciones?.forEach((v: any, idx: number) => {
              if (v.codigoInventario) {
                skus.push(v.codigoInventario);
                urlsOriginalesVar[v.codigoInventario] = v.imagenUrl || "";
              }
              if (v.imagenUrl) existingPreviews[idx] = v.imagenUrl;
            });

            setSkusOriginales(skus);
            setUrlsVariacionesOriginales(urlsOriginalesVar);
            setVariantPreviews(existingPreviews);

            let padreId = "";
            let hijaId = "";
            const nietaId = productoDetalle.categoriaId;

            for (const padre of cats) {
              if (padre.subcategorias) {
                for (const hija of padre.subcategorias) {
                  if (
                    hija.subcategorias?.some(
                      (nieta: any) => nieta.id === nietaId,
                    )
                  ) {
                    padreId = String(padre.id);
                    hijaId = String(hija.id);
                    break;
                  }
                }
              }
              if (padreId) break;
            }

            form.reset({
              nombre: productoDetalle.nombre,
              slug: productoDetalle.slug,
              descripcion: productoDetalle.descripcion,
              categoriaPadreId: padreId,
              categoriaHijaId: hijaId,
              categoriaId: nietaId,
              marcaId: productoDetalle.marcaId,
              estado: productoDetalle.estado ?? true,
              variaciones: productoDetalle.variaciones
                ? productoDetalle.variaciones.map((v: any) => ({
                    codigoInventario: v.codigoInventario,
                    precio: v.precio,
                    stock: v.stock,
                    isNewInDb: false,
                    caracteristicas: v.caracteristicas
                      ? v.caracteristicas.map((c: any) => ({
                          atributoNombre: c.atributoNombre || c.atributo || "",
                          valorTexto: c.valorTexto || c.valor || "",
                        }))
                      : [],
                  }))
                : [],
            });
          }
        }
      } catch (error) {
        console.error(
          "Error al inicializar el ecosistema del formulario:",
          error,
        );
      } finally {
        setIsLoading(false);
      }
    };

    cargarTodo();
  }, [productoId, isEdit]);

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
    if (!isEdit && !mainPreview) {
      form.setError("imagenArchivo", {
        message: "La imagen principal es requerimiento en nuevos productos",
      });
      return;
    }

    try {
      setIsLoading(true);

      let finalMainImageUrl = urlImagenMaestraOriginal;
      if (values.imagenArchivo && values.imagenArchivo.length > 0) {
        const urlSubida = await upLoadImage(
          values.imagenArchivo[0],
          "product-img",
          "principales",
        );
        if (urlSubida) finalMainImageUrl = urlSubida;
      }

      // CORRECCIÓN: Estructuramos exactamente igual a VariacionRequest y CaracteristicaRequest
      const variacionesProcesadas = await Promise.all(
        values.variaciones.map(async (v) => {
          let finalVariantImageUrl =
            urlsVariacionesOriginales[v.codigoInventario] || "";

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
            imagenUrl: finalVariantImageUrl,
            // Aquí enviamos exactamente las propiedades requeridas por CaracteristicaRequest
            caracteristicas: v.caracteristicas.map((c) => ({
              atributoNombre: c.atributoNombre,
              valorTexto: c.valorTexto,
            })),
          };
        }),
      );

      if (isEdit && productoId) {
        const idNumerico = Number(productoId);

        await updateProducto(
          idNumerico,
          values.categoriaId,
          values.marcaId,
          values.nombre,
          values.slug,
          finalMainImageUrl,
          values.descripcion,
          values.estado,
        );

        const peticionesVariaciones = variacionesProcesadas.map((variacion) => {
          const esExistente = skusOriginales.includes(
            variacion.codigoInventario,
          );

          if (esExistente) {
            return updateVariacion(variacion.codigoInventario, variacion);
          } else {
            return createVariacion(idNumerico, variacion);
          }
        });

        await Promise.all(peticionesVariaciones);
        alert("¡Producto y variaciones actualizados correctamente!");
      } else {
        // CORRECCIÓN: Cumple al 100% con la interfaz ProductoRequest sin usar 'as any'
        const productoPayload: ProductoRequest = {
          nombre: values.nombre,
          slug: values.slug,
          descripcion: values.descripcion,
          imagenUrl: finalMainImageUrl,
          estado: values.estado,
          categoriaId: values.categoriaId,
          marcaId: values.marcaId,
          variaciones: variacionesProcesadas, // Ya coincide perfectamente con VariacionRequest[]
        };

        await createProducto(productoPayload);
        alert("¡Producto registrado con éxito!");
      }

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(
        "Error crítico procesando los endpoints del producto:",
        error,
      );
      alert("Hubo un error al intentar guardar los cambios.");
    } finally {
      setIsLoading(false);
    }
  };

  const submitHandler: ReturnType<typeof form.handleSubmit> = form.handleSubmit(
    onSubmit as unknown as SubmitHandler<any>,
  );

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
    cargarMarcas,
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
