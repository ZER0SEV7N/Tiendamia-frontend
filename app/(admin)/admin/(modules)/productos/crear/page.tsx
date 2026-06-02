"use client";

import { ProductoForm } from "@/app/(admin)/admin/components/producto/FormProducto";

function page() {
  return (
    <div>
      <ProductoForm isEdit={false} />
    </div>
  );
}

export default page;
