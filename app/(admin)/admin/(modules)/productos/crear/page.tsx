"use client";

import { ProductoForm } from "@/app/(admin)/admin/components/FormProducto";

function page() {
  return (
    <div>
      <ProductoForm
        isEdit={false}
        onCreate={() => console.log("Producto creado")}
      />
    </div>
  );
}

export default page;
