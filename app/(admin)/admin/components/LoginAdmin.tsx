import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LayoutDashboard } from "lucide-react";
import { useLoginAdmin } from "../hooks/useLoginAdmin";

export function LoginAdmin({ ...props }: React.ComponentProps<"div">) {
  const { email, setEmail, password, setPassword, handleSubmit, error } =
    useLoginAdmin();

  return (
    <div {...props}>
      <Card className="overflow-hidden p-0 border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-2xl">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Formulario de Login Izquierdo */}
          <form
            onSubmit={handleSubmit}
            className="p-8 md:p-12 flex flex-col justify-center bg-white dark:bg-zinc-950"
          >
            <FieldGroup className="space-y-5">
              <div className="flex flex-col items-center gap-2 text-center mb-4">
                <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                  Bienvenido de nuevo
                </h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Por favor, ingresa tus credenciales de administrador
                </p>
              </div>

              <Field className="space-y-1.5">
                <FieldLabel
                  htmlFor="email"
                  className="text-xs font-semibold uppercase tracking-wider text-zinc-500"
                >
                  Correo Electrónico
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="focus-visible:ring-[#FF3C3C] h-11"
                  required
                />
              </Field>

              <Field className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <FieldLabel
                    htmlFor="password"
                    className="text-xs font-semibold uppercase tracking-wider text-zinc-500"
                  >
                    Contraseña
                  </FieldLabel>
                  <a
                    href="#"
                    className="text-xs font-medium text-[#FF3C3C] hover:underline underline-offset-4"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus-visible:ring-[#FF3C3C] h-11"
                  required
                />
              </Field>

              {/* Mensaje de Error */}
              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}

              <Field className="pt-2">
                <Button
                  type="submit"
                  className="w-full h-11 bg-[#FF3C3C] hover:bg-[#e03030] text-white font-medium transition-colors shadow-lg shadow-red-500/20 rounded-xl"
                >
                  Ingresar al sistema
                </Button>
              </Field>
            </FieldGroup>
          </form>

          {/* Panel Derecho Tecnológico */}
          <div className="hidden relative md:flex flex-col justify-center items-center p-12 select-none overflow-hidden bg-zinc-950 text-white border-l border-zinc-900">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FF3C3C]/15 via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="relative z-10 max-w-xs text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-zinc-900/80 border border-[#FF3C3C]/30 text-[#FF3C3C] shadow-2xl backdrop-blur-md mx-auto relative">
                <div className="absolute inset-0 rounded-2xl bg-[#FF3C3C]/20 blur-xl opacity-50" />
                <LayoutDashboard
                  size={36}
                  strokeWidth={1.25}
                  className="relative z-10"
                />
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-100">
                  Panel de Administrador
                </h2>
                <div className="h-0.5 w-12 bg-[#FF3C3C] mx-auto rounded-full" />
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Gestión centralizada de inventario, monitoreo de órdenes y
                  configuraciones globales de{" "}
                  <span className="text-zinc-100 font-semibold tracking-wide">
                    Tiendamia
                  </span>
                  .
                </p>
              </div>
            </div>

            <div className="absolute bottom-4 text-[10px] font-mono tracking-widest text-zinc-600 uppercase">
              Core Admin v2.6
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
