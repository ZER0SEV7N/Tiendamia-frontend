"use client";

import { useParams, useRouter } from "next/navigation";
import { ProductoForm } from "@/app/(admin)/admin/components/producto/FormProducto";

export default function EditarProductoPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  return (
    <div>
      <ProductoForm
        isEdit={true}
        productoId={Number(id)}
        onSuccessSave={() => router.push("/admin/productos")}
        onOpenModalNuevaMarca={() => console.log("Abrir modal de marcas")}
      />
    </div>
  );
}
