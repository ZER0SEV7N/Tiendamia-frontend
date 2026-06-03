import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormProvider } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { useMarcaForm } from "../../hooks/marca/useMarcaForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ModalMarcaProps {
  icons: React.ReactNode;
  props?: string;
  marcaId?: string;
  isEdit: boolean;
  onSuccess?: () => void;
}

function ModalMarca({
  icons,
  props,
  isEdit = false,
  marcaId,
  onSuccess,
}: ModalMarcaProps) {
  const {
    form,
    handleSubmit,
    isModalOpen,
    setIsModalOpen,
    urlImagenBannerOriginal,
    urlImagenLogoOriginal,
  } = useMarcaForm({
    marcaId,
    isEdit,
    onSuccess,
  });

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger className={props}>{icons}</DialogTrigger>
      <DialogContent className="sm:max-w-150 p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>{isEdit ? "Editar Marca" : "Crear Marca"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Modifica los detalles de la marca seleccionada."
              : "Completa el formulario para crear una nueva marca."}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="p-6 flex flex-col gap-5 bg-white dark:bg-zinc-950"
        >
          <FormProvider {...form}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {/* Nombre */}
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-xs font-semibold">
                      Nombre
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nombre de la Marca"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Slug */}
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-xs font-semibold">
                      Slug
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="slug-de-la-marca"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Descripción */}
              <div className="md:col-span-2 w-full">
                <FormField
                  control={form.control}
                  name="descripcion"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-xs font-semibold">
                        Descripción
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Descripción de la Marca"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Imagen Banner con Miniatura Flotante */}
              <FormField
                control={form.control}
                name="imagen_banner"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-xs font-semibold">
                      Imagen Banner (opcional)
                    </FormLabel>
                    <div className="relative flex items-center">
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          className="w-full cursor-pointer pr-16"
                          onChange={(e) => field.onChange(e.target.files)}
                        />
                      </FormControl>

                      {isEdit && urlImagenBannerOriginal && (
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-10 bg-zinc-100 rounded border overflow-hidden flex items-center justify-center shadow-sm pointer-events-none">
                          <Image
                            src={urlImagenBannerOriginal}
                            alt="Banner actual"
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

              {/* Imagen Logo con Miniatura Flotante */}
              <FormField
                control={form.control}
                name="imagen_logo"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-xs font-semibold">
                      Imagen Logo (opcional)
                    </FormLabel>
                    <div className="relative flex items-center">
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          className="w-full cursor-pointer pr-16"
                          onChange={(e) => field.onChange(e.target.files)}
                        />
                      </FormControl>

                      {isEdit && urlImagenLogoOriginal && (
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-10 bg-zinc-100 rounded border overflow-hidden flex items-center justify-center shadow-sm pointer-events-none">
                          <Image
                            src={urlImagenLogoOriginal}
                            alt="Logo actual"
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

              {/* Checkbox Destacada */}
              <div className="md:col-span-2 flex items-center pt-2">
                <FormField
                  control={form.control}
                  name="destacada"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => field.onChange(checked)}
                        />
                      </FormControl>
                      <FormLabel className="text-xs font-semibold cursor-pointer select-none">
                        Marcar esta marca como destacada en la tienda
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Botón de acción */}
            <div className="flex justify-end mt-2">
              <Button
                type="submit"
                className="bg-[#FF3C3C] hover:bg-[#E03030] text-white font-bold h-10 px-6 rounded-xl transition-colors shadow-sm shadow-red-100 w-full sm:w-auto"
              >
                {isEdit ? "Guardar Cambios" : "Crear Marca"}
              </Button>
            </div>
          </FormProvider>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ModalMarca;
