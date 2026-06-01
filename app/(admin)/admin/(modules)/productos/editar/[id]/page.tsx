"use client";

import { ProductoForm } from "@/app/(admin)/admin/components/FormProducto";

function page() {
  return (
    <div>
      <ProductoForm isEdit={true} />
    </div>
  );
}

export default page;
