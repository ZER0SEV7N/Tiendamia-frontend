"use client";

import { LoginAdmin } from "../../components/LoginAdmin";

function page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginAdmin />
      </div>
    </div>
  );
}

export default page;
