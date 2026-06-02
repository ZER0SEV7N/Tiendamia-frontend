/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Marca } from "@/types/marca/marca";
import { getByIdMarca, createMarca } from "@/services/marca";
import { useEffect, useState } from "react";
import * as z from "zod";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const [marca, setMarca] = useState<Marca | null>(null);
  const [loading, setLoading] = useState(false);
  const [urlImagenBanner, setUrlImagenBanner] = useState<string | null>(null);
  const [urlImagenLogo, setUrlImagenLogo] = useState<string | null>(null);

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
      setLoading(true);
      try {
        if (isEdit && marcaId) {
          const data = await getByIdMarca(Number(marcaId));
          setMarca(data);
          // Si la marca tiene imágenes, establecer las URLs para mostrar las vistas previas
          if (data.imagen_banner) {
            setUrlImagenBanner(data.imagen_banner);
          }
          if (data.imagen_logo) {
            setUrlImagenLogo(data.imagen_logo);
          }
          form.reset({
            nombre: data.nombre,
            slug: data.slug,
            descripcion: data.descripcion,
            destacada: data.destacada,
            imagen_banner: urlImagenBanner ? undefined : undefined, // No se carga el archivo, solo se muestra la URL
            imagen_logo: urlImagenLogo ? undefined : undefined, // No se carga el archivo, solo se muestra la URL
          });
        }
      } catch (error) {
        console.error("Error al cargar la marca:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isEdit) {
      cargarMarca();
    }
  }, [marcaId, isEdit]);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
    } catch (error) {
      console.error("Error al guardar la marca:", error);
    } finally {
      setLoading(false);
    }
  };

  return { form };
};
