import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Control } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Plus,
  Trash2,
  Save,
  RefreshCw,
  Image as ImageIcon,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { Categoria } from "@/types/categoria/categoria";

// Validación de archivos con Zod
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

const fileValidation = z
  .any()
  .refine((files) => files?.length === 1, "La imagen es obligatoria")
  .refine(
    (files) => files?.[0]?.size <= MAX_FILE_SIZE,
    "El tamaño máximo es de 5MB",
  )
  .refine(
    (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
    "Solo se admiten formatos .jpg, .jpeg, .png y .webp",
  );

const caracteristicaSchema = z.object({
  atributoNombre: z.string().min(1, "El atributo es obligatorio"),
  valorTexto: z.string().min(1, "El valor es obligatorio"),
});

const variacionSchema = z.object({
  codigoInventario: z.string().min(1, "El SKU es obligatorio"),
  precio: z.coerce.number().positive("El precio debe ser mayor a 0"),
  stock: z.coerce.number().int().min(0, "El stock no puede ser negativo"),
  imagenArchivo: fileValidation,
  caracteristicas: z.array(caracteristicaSchema),
  isNewInDb: z.boolean().optional().default(false),
});

const formSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, "Formato de slug inválido (ej: mi-marca-123)"),
  descripcion: z.string().min(1, "La descripción es obligatoria"),
  imagenArchivo: z.any().optional(),
  categoriaPadreId: z.string().optional(),
  categoriaHijaId: z.string().optional(),
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

type FormValues = z.infer<typeof formSchema>;

interface ProductoFormProps {
  initialData?: any;
  isEdit?: boolean;
  onCreate?: (data: FormData) => void;
  onUpdateProduct?: (data: any) => void;
  onUpdateVariant?: (sku: string, data: any) => void;
  onCreateVariant?: (data: any) => void;
  onOpenModalNuevaMarca?: () => void;
}

// =========================================================
// SUBCOMPONENTE: Atributos Dinámicos por Variante
// =========================================================
interface AtributosDinamicosProps {
  nestIndex: number;
  control: Control<FormValues>;
}

const AtributosDinamicos = ({
  nestIndex,
  control,
}: AtributosDinamicosProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `variaciones.${nestIndex}.caracteristicas`,
  });

  return (
    <div className="md:col-span-2 xl:col-span-6 space-y-3 p-4 bg-slate-50/50 rounded-xl border border-dashed border-slate-200 w-full">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Características / Especificaciones
        </span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-7 text-xs gap-1 border-cyan-200 text-cyan-600 hover:bg-cyan-50 font-semibold"
          onClick={() => append({ atributoNombre: "", valorTexto: "" })}
        >
          <Plus className="h-3 w-3" /> Añadir Atributo
        </Button>
      </div>

      {fields.length === 0 ? (
        <p className="text-xs text-muted-foreground italic text-center py-2 bg-white/50 border rounded-lg">
          Sin atributos asignados. Agrega características manualmente.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {fields.map((item, kIndex) => (
            <div
              key={item.id}
              className="flex items-end gap-2 bg-white p-2.5 border rounded-lg shadow-sm"
            >
              <div className="grid grid-cols-2 gap-2 flex-1">
                <FormField
                  control={control}
                  name={`variaciones.${nestIndex}.caracteristicas.${kIndex}.atributoNombre`}
                  render={({ field }) => (
                    <FormItem>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        Atributo
                      </span>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Ej: Color"
                          className="h-7 text-xs font-semibold"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`variaciones.${nestIndex}.caracteristicas.${kIndex}.valorTexto`}
                  render={({ field }) => (
                    <FormItem>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        Valor
                      </span>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Ej: Rojo"
                          className="h-7 text-xs"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-red-400 hover:text-red-600 hover:bg-red-50 mb-[2px]"
                onClick={() => remove(kIndex)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// =========================================================
// COMPONENTE PRINCIPAL: Formulario de Productos
// =========================================================
export const ProductoForm = ({
  initialData,
  isEdit = false,
  onCreate,
  onUpdateProduct,
  onUpdateVariant,
  onCreateVariant,
  onOpenModalNuevaMarca,
}: ProductoFormProps) => {
  const [mainPreview, setMainPreview] = useState<string | null>(null);
  const [variantPreviews, setVariantPreviews] = useState<
    Record<number, string>
  >({});

  const [categoriasPadre, setCategoriasPadre] = useState<Categoria[]>([]);
  const [categoriasHija, setCategoriasHija] = useState<Categoria[]>([]);
  const [categoriasNieta, setCategoriasNieta] = useState<Categoria[]>([]);
  const [marcas, setMarcas] = useState<Categoria[]>([]);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
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

  useEffect(() => {
    if (isEdit && initialData) {
      form.reset(initialData);
      if (initialData.imagenUrl) setMainPreview(initialData.imagenUrl);

      const existingPreviews: Record<number, string> = {};
      initialData.variaciones?.forEach((v: any, idx: number) => {
        if (v.imagenUrl) existingPreviews[idx] = v.imagenUrl;
      });
      setVariantPreviews(existingPreviews);
    }
  }, [initialData, isEdit, form]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (...event: any[]) => void,
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

  const onSubmit = (values: FormValues) => {
    if (!isEdit && onCreate) {
      const formData = new FormData();
      formData.append("nombre", values.nombre);
      formData.append("slug", values.slug);
      formData.append("descripcion", values.descripcion);
      formData.append("categoriaId", String(values.categoriaId));
      formData.append("marcaId", String(values.marcaId));
      formData.append("estado", String(values.estado));

      if (values.imagenArchivo?.[0]) {
        formData.append("imagenPrincipal", values.imagenArchivo[0]);
      }

      values.variaciones.forEach((variacion, index) => {
        formData.append(
          `variaciones[${index}][codigoInventario]`,
          variacion.codigoInventario,
        );
        formData.append(
          `variaciones[${index}][precio]`,
          String(variacion.precio),
        );
        formData.append(
          `variaciones[${index}][stock]`,
          String(variacion.stock),
        );
        formData.append(
          `variaciones[${index}][caracteristicas]`,
          JSON.stringify(variacion.caracteristicas),
        );

        if (variacion.imagenArchivo?.[0]) {
          formData.append(
            `imagenVariante_${index}`,
            variacion.imagenArchivo[0],
          );
        }
      });

      onCreate(formData);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full max-w-full p-6 bg-white rounded-xl border shadow-sm"
        >
          {/* ENCABEZADO */}
          <div className="border-b pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div className="flex flex-col gap-1 w-full">
              {/* Contenedor flexible para el Botón y el Título alineados al centro */}
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="icon" // Cambiado a "icon" para que sea perfectamente cuadrado
                  onClick={() => router.push("/admin/productos")}
                  className="h-9 w-9 bg-[#FF3C3C] text-white hover:bg-[#b31a0f] hover:text-white cursor-pointer shrink-0 shadow-sm border-none flex items-center justify-center"
                  title="Volver a productos"
                >
                  {/* Icono agrandado a h-5 w-5 */}
                  <ArrowLeft className="h-5 w-5" />
                </Button>

                <h2 className="text-2xl font-bold tracking-tight text-slate-900 leading-none">
                  {isEdit
                    ? `Editar Producto: ${form.watch("nombre")}`
                    : "Crear Nuevo Producto"}
                </h2>
              </div>

              <p className="text-sm text-muted-foreground mt-2 pl-[3.25rem] hidden sm:block">
                Gestiona la información base del catálogo y controla el
                inventario de sus variantes.
              </p>
            </div>
          </div>

          {/* ================= SECCIÓN MAESTRA: DATOS BASE ================= */}
          <div className="space-y-6 p-5 bg-slate-50/50 rounded-xl border border-slate-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 border-b pb-2">
              Información del Producto
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold">
                      Nombre del Producto *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Zapatillas Deportivas 5KS"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold">
                      Slug *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="zapatillas-deportivas-5ks"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* MARCA SUBIDA A LA PRIMERA FILA */}
              <FormField
                control={form.control}
                name="marcaId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold">
                      Marca *
                    </FormLabel>
                    <div className="flex gap-2">
                      <FormControl className="flex-1">
                        <select
                          {...field}
                          className="w-full h-10 px-3 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
                        >
                          <option value="">Seleccione Marca...</option>
                          {marcas.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.nombre}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        className="h-10 px-3 border-dashed border-slate-300 text-slate-600 hover:bg-slate-100 hover:text-slate-900 shrink-0"
                        onClick={onOpenModalNuevaMarca}
                        title="Agregar nueva marca"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* BLOQUE DE CATEGORÍAS EN UNA SOLA LÍNEA */}
              <div className="grid grid-cols-1 md:grid-cols-3 md:col-span-2 xl:col-span-3 gap-4">
                <FormField
                  control={form.control}
                  name="categoriaPadreId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold">
                        Categoría Principal *
                      </FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full h-10 px-3 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
                          onChange={(e) => {
                            field.onChange(e);
                            form.setValue("categoriaHijaId", "");
                            form.setValue("categoriaId", undefined as any);
                          }}
                        >
                          <option value="">Seleccione...</option>
                          {categoriasPadre.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.nombre}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoriaHijaId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold">
                        Subcategoría *
                      </FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          disabled={!form.watch("categoriaPadreId")}
                          className="w-full h-10 px-3 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:bg-slate-100 disabled:cursor-not-allowed"
                          onChange={(e) => {
                            field.onChange(e);
                            form.setValue("categoriaId", undefined as any);
                          }}
                        >
                          <option value="">Seleccione...</option>
                          {categoriasHija.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.nombre}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoriaId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold">
                        Línea / Detalle *
                      </FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          disabled={!form.watch("categoriaHijaId")}
                          className="w-full h-10 px-3 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:bg-slate-100 disabled:cursor-not-allowed"
                        >
                          <option value="">Seleccione...</option>
                          {categoriasNieta.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.nombre}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* IMAGEN Y DESCRIPCIÓN */}
              <div className="md:col-span-1">
                <FormField
                  control={form.control}
                  name="imagenArchivo"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold">
                        Imagen Principal del Producto
                      </FormLabel>
                      <div className="flex gap-4 items-center border p-2 bg-white rounded-lg h-10">
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            className="text-xs cursor-pointer border-none shadow-none h-full p-0 bg-transparent file:bg-transparent file:border-none"
                            onChange={(e) =>
                              handleImageChange(e, onChange, "main")
                            }
                            {...rest}
                          />
                        </FormControl>
                        {mainPreview && (
                          <div className="h-8 w-8 min-w-8 rounded border overflow-hidden bg-slate-100 flex items-center justify-center">
                            <Image
                              src={mainPreview}
                              alt="Preview"
                              width={32}
                              height={32}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="descripcion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold">
                        Descripción del Producto *
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Detalles clave del producto..."
                          className="resize-none"
                          rows={1}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {isEdit && (
                <div className="md:col-span-2 xl:col-span-3 flex items-center">
                  <FormField
                    control={form.control}
                    name="estado"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-xs font-semibold cursor-pointer">
                            Producto Activo / Visible en tienda
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>

            {isEdit && onUpdateProduct && (
              <div className="flex justify-end pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => onUpdateProduct(form.getValues())}
                  className="gap-1.5 font-semibold text-xs bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <RefreshCw className="h-3 w-3" /> Actualizar Datos Base
                </Button>
              </div>
            )}
          </div>

          {/* ================= SECCIÓN DETALLE: VARIACIONES ================= */}
          <div className="space-y-4 p-5 bg-slate-50/50 rounded-xl border border-slate-100">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="icon"
                  className="h-7 w-7 bg-[#FF3C3C] hover:bg-[#b31a0f] cursor-pointer text-white"
                  onClick={() =>
                    appendVariant({
                      codigoInventario: "",
                      precio: 0,
                      stock: 0,
                      imagenArchivo: undefined,
                      caracteristicas: [],
                      isNewInDb: isEdit,
                    })
                  }
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Variaciones y Atributos
                </h3>
              </div>
            </div>

            <div className="space-y-6">
              {variantFields.map((field, index) => {
                const isNewRow = form.watch(`variaciones.${index}.isNewInDb`);
                return (
                  <div
                    key={field.id}
                    className="flex gap-4 p-4 bg-white border rounded-xl shadow-sm items-start relative hover:border-slate-300 transition flex-col sm:flex-row"
                  >
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="sm:mt-6 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 shrink-0"
                      onClick={() => {
                        if (!isEdit && variantFields.length === 1) return;
                        removeVariant(index);
                        const updatedPreviews = { ...variantPreviews };
                        delete updatedPreviews[index];
                        setVariantPreviews(updatedPreviews);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 w-full">
                      <FormField
                        control={form.control}
                        name={`variaciones.${index}.codigoInventario`}
                        render={({ field }) => (
                          <FormItem className="xl:col-span-1">
                            <FormLabel className="text-[11px] font-bold text-slate-500 uppercase">
                              SKU / Inventario *
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="ZAPA-RED-41"
                                disabled={isEdit && !isNewRow}
                                {...field}
                                className="text-xs"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`variaciones.${index}.precio`}
                        render={({ field }) => (
                          <FormItem className="xl:col-span-1">
                            <FormLabel className="text-[11px] font-bold text-slate-500 uppercase">
                              Precio *
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                {...field}
                                className="text-xs"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`variaciones.${index}.stock`}
                        render={({ field }) => (
                          <FormItem className="xl:col-span-1">
                            <FormLabel className="text-[11px] font-bold text-slate-500 uppercase">
                              Stock *
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="0"
                                {...field}
                                className="text-xs"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`variaciones.${index}.imagenArchivo`}
                        render={({ field: { onChange, value, ...rest } }) => (
                          <FormItem className="md:col-span-2 xl:col-span-3">
                            <FormLabel className="text-[11px] font-bold text-slate-500 uppercase">
                              Foto de Variante *
                            </FormLabel>
                            <div className="flex gap-3 items-center border p-1 bg-white rounded-lg">
                              <FormControl>
                                <Input
                                  type="file"
                                  accept="image/*"
                                  className="text-xs h-8 cursor-pointer"
                                  onChange={(e) =>
                                    handleImageChange(
                                      e,
                                      onChange,
                                      "variant",
                                      index,
                                    )
                                  }
                                  {...rest}
                                />
                              </FormControl>
                              {variantPreviews[index] ? (
                                <div className="h-8 w-8 min-w-8 rounded border overflow-hidden bg-slate-50 flex items-center justify-center">
                                  <Image
                                    src={variantPreviews[index]}
                                    alt="Variant preview"
                                    width={32}
                                    height={32}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="h-8 w-8 min-w-8 bg-slate-100 rounded flex items-center justify-center text-slate-400">
                                  <ImageIcon className="h-4 w-4" />
                                </div>
                              )}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <AtributosDinamicos
                        nestIndex={index}
                        control={form.control}
                      />

                      {isEdit && (
                        <div className="md:col-span-2 xl:col-span-6 flex justify-end pt-2 border-t border-dashed">
                          {!isNewRow && onUpdateVariant ? (
                            <Button
                              type="button"
                              size="sm"
                              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs"
                              onClick={() =>
                                onUpdateVariant(
                                  form.getValues(
                                    `variaciones.${index}.codigoInventario`,
                                  ),
                                  form.getValues(`variaciones.${index}`),
                                )
                              }
                            >
                              Actualizar Variante
                            </Button>
                          ) : (
                            onCreateVariant && (
                              <Button
                                type="button"
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold text-xs"
                                onClick={() =>
                                  onCreateVariant(
                                    form.getValues(`variaciones.${index}`),
                                  )
                                }
                              >
                                Guardar como Nueva Variante
                              </Button>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ACCIONES INFERIORES */}
          <div className="flex justify-end pt-4 border-t">
            {!isEdit ? (
              <Button
                type="submit"
                className="bg-[#FF3C3C] hover:bg-[#b31a0f] cursor-pointer text-white font-medium px-8"
              >
                <Save className="mr-2 h-4 w-4" /> Guardar Producto
              </Button>
            ) : (
              <p className="text-xs text-muted-foreground italic">
                * Cada sección se guarda individualmente mediante sus
                respectivos botones en modo edición.
              </p>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
