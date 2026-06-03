/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, FormProvider } from "react-hook-form";
import {
  Plus,
  Trash2,
  Save,
  Image as ImageIcon,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
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

import {
  useProductoForm,
  FormValues,
} from "@/app/(admin)/admin/hooks/producto/useProductoForm"; // Ajusta la ruta según tu proyecto
import { ProductoRequest } from "@/types/producto/productoList";
import ModalMarca from "@/app/(admin)/admin/components/marca/ModalMarca";

interface ProductoFormProps {
  productoId?: number;
  initialData?: ProductoRequest;
  isEdit?: boolean;
  onCreate?: (data: ProductoRequest) => void | Promise<string>;
  onUpdate?: (data: ProductoRequest) => void | Promise<string>;
  onSuccessSave?: () => void;
}

// =========================================================
// SUBCOMPONENTE: Atributos Dinámicos por Variante
// =========================================================
interface AtributosDinamicosProps {
  nestIndex: number;
  control: Control<FormValues>;
  append: (value: { atributoNombre: string; valorTexto: string }) => void;
  remove: (index: number) => void;
  fields: Record<string, any>[];
}

const AtributosDinamicos = ({
  nestIndex,
  control,
  fields,
  append,
  remove,
}: AtributosDinamicosProps) => {
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
                className="h-7 w-7 text-red-400 hover:text-red-600 hover:bg-red-50 mb-0.5"
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
  productoId,
  isEdit = false,
  onSuccessSave,
}: ProductoFormProps) => {
  const router = useRouter();

  const {
    form,
    onSubmit,
    isLoading,
    marcas,
    cargarMarcas,
    opcionesPadre,
    opcionesHija,
    opcionesNieta,
    mainPreview,
    variantPreviews,
    variantFields,
    appendVariant,
    handleRemoveVariant,
    handleImageChange,
  } = useProductoForm({
    productoId: productoId?.toString(),
    isEdit,
    onSuccess: onSuccessSave,
  });

  if (isLoading) {
    return (
      <div className="w-full h-60 flex items-center justify-center bg-white rounded-2xl border shadow-sm">
        <div className="flex flex-col items-center gap-2 text-muted-foreground text-sm">
          <Loader2 className="h-8 w-8 animate-spin text-[#FF3C3C]" />
          <span>Cargando catálogos y dependencias...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Proveedor de Formulario de react-hook-form usando la instancia del hook */}
      <FormProvider {...form}>
        <form
          onSubmit={onSubmit}
          className="space-y-8 w-full max-w-full p-6 bg-white rounded-xl border shadow-sm"
        >
          {/* ENCABEZADO */}
          <div className="border-b pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div className="flex flex-col gap-1 w-full">
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => router.push("/admin/productos")}
                  className="h-9 w-9 bg-[#FF3C3C] text-white hover:bg-[#b31a0f] hover:text-white cursor-pointer shrink-0 shadow-sm border-none flex items-center justify-center"
                  title="Volver a productos"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>

                <h2 className="text-2xl font-bold tracking-tight text-slate-900 leading-none">
                  {isEdit
                    ? `Editar Producto: ${form.watch("nombre")}`
                    : "Crear Nuevo Producto"}
                </h2>
              </div>

              <p className="text-sm text-muted-foreground mt-2 pl-13 hidden sm:block">
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

              {/* MARCA INYECTADA DESDE EL HOOK */}
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
                          value={field.value ?? ""}
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
                      <ModalMarca
                        icons={<Plus className="h-4 w-4" />}
                        isEdit={false}
                        props="h-10 px-3 border-dashed border-slate-300 text-slate-600 hover:bg-slate-100 hover:text-slate-900 shrink-0"
                        onSuccess={cargarMarcas}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* BLOQUE DE CATEGORÍAS EN CASCADA COMPLETA */}
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
                        >
                          <option value="">Seleccione...</option>
                          {opcionesPadre.map((cat) => (
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
                        >
                          <option value="">Seleccione...</option>
                          {opcionesHija.map((cat) => (
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
                          value={field.value ?? ""}
                          disabled={!form.watch("categoriaHijaId")}
                          className="w-full h-10 px-3 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:bg-slate-100 disabled:cursor-not-allowed"
                        >
                          <option value="">Seleccione...</option>
                          {opcionesNieta.map((cat) => (
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

              {/* CONTROL DE ESTADO EN EDICIÓN */}
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
                // Instanciamos el manejador interno para sus características de FieldArray
                // Esto nos permite aislar las mutaciones de atributos de cada fila/variación de forma nativa.
                const subMethods = {
                  append: (val: any) => {
                    const current =
                      form.getValues(`variaciones.${index}.caracteristicas`) ||
                      [];
                    form.setValue(`variaciones.${index}.caracteristicas`, [
                      ...current,
                      val,
                    ]);
                  },
                  remove: (kIdx: number) => {
                    const current =
                      form.getValues(`variaciones.${index}.caracteristicas`) ||
                      [];
                    form.setValue(
                      `variaciones.${index}.caracteristicas`,
                      current.filter((_, i) => i !== kIdx),
                    );
                  },
                  fields:
                    form.watch(`variaciones.${index}.caracteristicas`) || [],
                };

                // Convertimos el array reactivo actual a objetos con un ID virtual para iterar estables en el subcomponente
                const virtualizedFields = subMethods.fields.map(
                  (f: any, i: number) => ({
                    id: `${field.id}-attr-${i}`,
                    ...f,
                  }),
                );

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
                      onClick={() => handleRemoveVariant(index)}
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
                                disabled={
                                  isEdit &&
                                  !form.getValues(
                                    `variaciones.${index}.isNewInDb`,
                                  )
                                }
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

                      {/* SUBCOMPONENTE DE ATRIBUTOS PASANDO LOS MANEJADORES CENTRALIZADOS */}
                      <AtributosDinamicos
                        nestIndex={index}
                        control={form.control}
                        fields={virtualizedFields}
                        append={subMethods.append}
                        remove={subMethods.remove}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ACCIONES INFERIORES CENTRALIZADAS */}
          <div className="flex justify-end pt-4 border-t">
            <Button
              type="submit"
              className="bg-[#FF3C3C] hover:bg-[#b31a0f] cursor-pointer text-white font-medium px-8 flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {isEdit ? "Actualizar Producto" : "Guardar Producto"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
