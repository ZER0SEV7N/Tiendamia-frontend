/* eslint-disable react-hooks/exhaustive-deps */
import { getByIdMarca, createMarca, updateMarca } from "@/services/marca";
import { useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { upLoadImage } from "@/supabaseCredentials"; // Función para subir imágenes a Supabase Storage

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

interface UseMarcaFormProps {
  marcaId?: string;
  isEdit: boolean;
  onSuccess?: () => void;
}

export const useMarcaForm = ({
  marcaId,
  isEdit,
  onSuccess,
}: UseMarcaFormProps) => {
  const [loading, setLoading] = useState(false);
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
      if (!isEdit || !marcaId) return;

      setLoading(true);
      try {
        const data = await getByIdMarca(Number(marcaId));

        // Guardamos las URLs originales en el estado
        if (data.imagen_banner) setUrlImagenBannerOriginal(data.imagen_banner);
        if (data.imagen_logo) setUrlImagenLogoOriginal(data.imagen_logo);

        // Seteamos los valores directamente con la data directa del API
        form.reset({
          nombre: data.nombre,
          slug: data.slug,
          descripcion: data.descripcion,
          destacada: data.destacada,
          imagen_banner: undefined, // El input file inicia vacío
          imagen_logo: undefined, // El input file inicia vacío
        });
      } catch (error) {
        console.error("Error al cargar la marca:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarMarca();
  }, [marcaId, isEdit]);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      let finalBannerUrl = urlImagenBannerOriginal;
      let finalLogoUrl = urlImagenLogoOriginal;
      // Si el usuario subió una nueva imagen, la subimos a Supabase y obtenemos la URL
      if (data.imagen_banner && data.imagen_banner.length > 0) {
        const urlSubida = await upLoadImage(
          data.imagen_banner[0],
          "marcas",
          "banner",
        );
        if (urlSubida) finalBannerUrl = urlSubida;
      }
      // Si el usuario subió una nueva imagen, la subimos a Supabase y obtenemos la URL
      if (data.imagen_logo && data.imagen_logo.length > 0) {
        const urlSubida = await upLoadImage(
          data.imagen_logo[0],
          "marcas",
          "logo",
        );
        if (urlSubida) finalLogoUrl = urlSubida;
      }
      // Construimos el objeto final a enviar al backend
      const payload = {
        nombre: data.nombre,
        slug: data.slug,
        descripcion: data.descripcion,
        destacada: !!data.destacada,
        imagen_banner: finalBannerUrl,
        imagen_logo: finalLogoUrl,
      };
      // Lógica para crear o actualizar según el modo
      if (isEdit && marcaId) {
        await updateMarca(Number(marcaId), payload);
        alert("¡Marca actualizada con éxito!");
      } else {
        await createMarca(payload);
        alert("¡Marca creada con éxito!");
      }
      // Llamamos al callback de éxito para cerrar el modal o refrescar la lista
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error al guardar la marca:", error);
    } finally {
      setLoading(false);
    }
  };

  return { form, onSubmit, loading };
};
