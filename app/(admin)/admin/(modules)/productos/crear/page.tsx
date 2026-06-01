"use client";

import { ProductoForm } from "@/app/(admin)/admin/components/FormProducto";

function page() {
  return (
    <div>
      <ProductoForm isEdit={false} />
    </div>
  );
}

export default page;
