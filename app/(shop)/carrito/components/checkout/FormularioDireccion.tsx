//carrito/components/checkout/FormularioDireccion.tsx
//FormularioDireccion es un componente que se encarga de mostrar el 
//formulario para ingresar la dirección de envío durante el proceso de checkout.
//Objetivo: permitir al usuario ingresar su dirección de envío, con validación básica de campos requeridos.
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import { DireccionForm } from "../../types/checkout";

interface Props {
    direccion: DireccionForm;
    setDireccion: React.Dispatch<React.SetStateAction<DireccionForm>>;
}

//Componente para mostrar el formulario de dirección de envío durante el proceso de checkout
export const FormularioDireccion = ({ direccion, setDireccion}: Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDireccion(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    return (
        <Card className="rounded-md border-slate-200 shadow-sm">
            <CardHeader className="border-b bg-slate-50/50 py-4">
                <div className="flex items-center space-x-2 text-slate-700">
                    <MapPin className="w-5 h-5 text-red-500" />
                    <CardTitle className="text-lg font-medium">1. Dirección de envío</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="direccion">Dirección exacta</Label>
                    <Input id="direccion" value={direccion.direccion} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="distrito">Distrito</Label>
                    <Input id="distrito" value={direccion.distrito} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="provincia">Provincia</Label>
                    <Input id="provincia" value={direccion.provincia} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="departamento">Departamento</Label>
                    <Input id="departamento" value={direccion.departamento} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="referencia">Referencia</Label>
                    <Input id="referencia" value={direccion.referencia} onChange={handleChange} required />
                </div>
            </CardContent>
        </Card>
    );
};