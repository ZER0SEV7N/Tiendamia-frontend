import React from "react";
import AddressForm from "@/components/AddressForm";

export default function DireccionesPage() {
  return (
    // Como el layout ya se encarga de la columna izquierda y el espaciado,
    // aquí solo renderizamos el formulario limpio.
    <AddressForm />
  );
}