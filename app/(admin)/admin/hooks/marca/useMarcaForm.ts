/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
import { getByIdMarca, createMarca, updateMarca } from "@/services/marca";
import { useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { upLoadImage } from "@/supabaseCredentials"; // Función para subir imágenes a Supabase Storage
import { Marca } from "@/types/marca/marca";

// Validación de imagen para la marca (opcional)
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

// Esquema de validación para la imagen de la marca (opcional)
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

const formSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  slug: z.string().min(1, "El slug es requerido"),
  descripcion: z.string(),
  destacada: z.boolean().optional(),
  imagen_banner: schemaImagenOpcional,
  imagen_logo: schemaImagenOpcional,
});

export type FormValues = z.infer<typeof formSchema>;

// 🔥 MODIFICADO: Ahora tipamos onSuccessData para pasar el Payload modificado a la tabla
interface UseMarcaFormProps {
  marcaId?: string;
  isEdit: boolean;
  onSuccessData?: (data: Partial<Marca>) => void;
}

export const useMarcaForm = ({
  marcaId,
  isEdit,
  onSuccessData,
}: UseMarcaFormProps) => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [urlImagenBannerOriginal, setUrlImagenBannerOriginal] = useState<
    string | null
  >(null);
  const [urlImagenLogoOriginal, setUrlImagenLogoOriginal] = useState<
    string | null
  >(null);

  // Configuración del formulario con React Hook Form y Zod para validación
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      slug: "",
      descripcion: "",
      destacada: false,
      imagen_banner: undefined,
      imagen_logo: undefined,
    },
  });

  // Efecto para cargar los datos de la marca si estamos en modo edición
  useEffect(() => {
    const cargarMarca = async () => {
      if (!isModalOpen || !isEdit || !marcaId) return;

      setLoading(true);
      try {
        const data = await getByIdMarca(Number(marcaId));

        // Guardamos las URLs originales en el estado
        if (data) {
          // Guardamos las URLs originales en los estados de forma segura
          setUrlImagenBannerOriginal(data.imagen_banner || null);
          setUrlImagenLogoOriginal(data.imagen_logo || null);
          // Seteamos el formulario usando la data directa de la API
          form.reset({
            nombre: data.nombre || "",
            slug: data.slug || "",
            descripcion: data.descripcion || "",
            destacada: !!data.destacada,
            imagen_banner: undefined,
            imagen_logo: undefined,
          });
        }
      } catch (error) {
        console.error("Error al cargar la marca:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarMarca();
  }, [marcaId, isEdit, isModalOpen, form]);

  // Efecto para limpiar el formulario cuando se cierra el modal
  useEffect(() => {
    if (!isModalOpen) {
      form.reset({
        nombre: "",
        slug: "",
        descripcion: "",
        destacada: false,
        imagen_banner: undefined,
        imagen_logo: undefined,
      });
      setUrlImagenBannerOriginal(null);
      setUrlImagenLogoOriginal(null);
    }
  }, [isModalOpen, form]);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      let finalBannerUrl = urlImagenBannerOriginal;
      let finalLogoUrl = urlImagenLogoOriginal;

      // Subida condicionada de Banner
      if (data.imagen_banner && data.imagen_banner.length > 0) {
        const urlSubida = await upLoadImage(
          data.imagen_banner[0],
          "marcas",
          "banner",
        );
        if (urlSubida) finalBannerUrl = urlSubida;
      }

      // Subida condicionada de Logo
      if (data.imagen_logo && data.imagen_logo.length > 0) {
        const urlSubida = await upLoadImage(
          data.imagen_logo[0],
          "marcas",
          "logo",
        );
        if (urlSubida) finalLogoUrl = urlSubida;
      }

      // Payload limpio para prevenir el Error 500 del Servidor
      const payload = {
        nombre: data.nombre,
        slug: data.slug,
        descripcion: data.descripcion || "",
        destacada: !!data.destacada,
        imagen_banner: finalBannerUrl || "",
        imagen_logo: finalLogoUrl || "",
      };

      if (isEdit && marcaId) {
        await updateMarca(Number(marcaId), payload);
        alert("¡Marca actualizada con éxito!");
      } else {
        await createMarca(payload);
        alert("¡Marca creada con éxito!");
      }

      setIsModalOpen(false); // Cierre exitoso controlado aquí

      // 🔥 MODIFICADO: Enviamos el payload hacia el componente que maneja la tabla
      if (onSuccessData) onSuccessData(payload);
    } catch (error) {
      console.error("Error al guardar la marca:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (e) e.stopPropagation(); // Prevenimos la propagación del evento para evitar cierres no deseados del modal
    e.preventDefault();
    form.handleSubmit(onSubmit)();
  };

  return {
    form,
    handleSubmit,
    loading,
    isModalOpen,
    setIsModalOpen,
    urlImagenBannerOriginal,
    urlImagenLogoOriginal,
  };
};
