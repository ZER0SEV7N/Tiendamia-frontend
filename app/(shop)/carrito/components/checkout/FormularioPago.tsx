//carrito/components/checkout/FormularioPago.tsx
//FormularioPago es un componente que se encarga de mostrar el formulario 
//para ingresar los datos de pago durante el proceso de checkout.
//Objetivo: permitir al usuario ingresar los datos de su tarjeta de crédito, 
//con validación básica de campos requeridos.
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard } from "lucide-react";
import { TarjetaForm } from "../../types/checkout";

interface Props {
    tarjeta: TarjetaForm;
    setTarjeta: React.Dispatch<React.SetStateAction<TarjetaForm>>;
}

export const FormularioPago = ({ tarjeta, setTarjeta}: Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTarjeta(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    return (
        <Card className="rounded-md border-slate-200 shadow-sm">
            <CardHeader className="border-b bg-slate-50/50 py-4">
                <div className="flex items-center space-x-2 text-slate-700">
                    <CreditCard className="w-5 h-5 text-red-500" />
                    <CardTitle className="text-lg font-medium">2. Método de pago</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
                <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs p-3 rounded-md">
                    No se realizarán cargos reales a tu tarjeta. Puedes usar datos ficticios.
                </div>
        
                <div className="space-y-2">
                    <Label htmlFor="card-numero">Número de tarjeta</Label>
                    <Input id="card-numero" placeholder="4000 1234 5678 9010" maxLength={19} value={tarjeta.numeroTarjeta} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="card-nombre">Nombre en la tarjeta</Label>
                    <Input id="card-nombre" placeholder="JUAN PEREZ" value={tarjeta.nombre} onChange={handleChange} required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="card-expiracion">Expiración</Label>
                        <Input id="card-expiracion" placeholder="MM/AA" maxLength={5} value={tarjeta.expiracion} onChange={handleChange} required />
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="card-cvv">CVV</Label>
                        <Input id="card-cvv" type="password" placeholder="123" maxLength={3} value={tarjeta.cvv} onChange={handleChange} required />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};