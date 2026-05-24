/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { usePathname } from "next/navigation";
import "./globals.css";

export const page = () => {
    const pathname = usePathname();
    return (
        <div className="container mx-auto max-w-6xl py-8 px-4">
            <h1 className="text-3xl font-semibold mb-8 text-slate-800">Bienvenido a Tiendamia</h1>
            <p className="text-lg text-slate-600">
                Estás en la página: <strong>{pathname}</strong>
            </p>
        </div>
    );
}