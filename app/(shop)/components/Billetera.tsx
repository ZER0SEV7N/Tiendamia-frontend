"use client";

import React, { useState, useEffect } from "react";
import { Wallet, TrendingUp, Plus, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";

export default function Billetera() {
  const [saldo, setSaldo] = useState(0);
  const [movimientos, setMovimientos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de datos de billetera
    // En el futuro esto se conectará con endpoints reales
    setSaldo(250.50);
    setMovimientos([
      {
        id: 1,
        tipo: "ingreso",
        monto: 100.00,
        descripcion: "Reembolso de compra",
        fecha: "2024-05-20",
        icono: ArrowDownLeft,
      },
      {
        id: 2,
        tipo: "gasto",
        monto: 50.00,
        descripcion: "Compra de productos",
        fecha: "2024-05-19",
        icono: ArrowUpRight,
      },
      {
        id: 3,
        tipo: "ingreso",
        monto: 200.50,
        descripcion: "Bono de bienvenida",
        fecha: "2024-05-18",
        icono: ArrowDownLeft,
      },
    ]);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex-1 p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded-lg w-1/3"></div>
          <div className="h-20 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 animate-in fade-in-50 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Wallet className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Mi Billetera</h1>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
          <Plus className="w-4 h-4" />
          Agregar Fondos
        </Button>
      </div>

      {/* Card de Saldo */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 text-white mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-in slide-in-from-top-5 duration-500">
        <div className="flex justify-between items-start mb-12">
          <div>
            <p className="text-blue-100 text-sm font-medium mb-2">Saldo Disponible</p>
            <h2 className="text-4xl font-bold">U$S {saldo.toFixed(2)}</h2>
          </div>
          <TrendingUp className="w-8 h-8 text-blue-200" />
        </div>

        <div className="border-t border-blue-400 pt-6 flex justify-between">
          <div>
            <p className="text-blue-100 text-xs font-medium">BILLETERA</p>
            <p className="text-blue-200 text-sm font-semibold">Principal</p>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-xs font-medium">ÚLTIMA ACTUALIZACIÓN</p>
            <p className="text-blue-200 text-sm font-semibold">Hoy</p>
          </div>
        </div>
      </div>

      {/* Sección de Movimientos */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">Movimientos Recientes</h3>

        {movimientos.length > 0 ? (
          <div className="space-y-3">
            {movimientos.map((mov, idx) => (
              <div
                key={mov.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 animate-in slide-in-from-left"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      mov.tipo === "ingreso"
                        ? "bg-green-100"
                        : "bg-red-100"
                    }`}
                  >
                    <mov.icono
                      className={`w-5 h-5 ${
                        mov.tipo === "ingreso"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {mov.descripcion}
                    </p>
                    <p className="text-sm text-gray-500">{mov.fecha}</p>
                  </div>
                </div>
                <p
                  className={`font-bold text-lg ${
                    mov.tipo === "ingreso"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {mov.tipo === "ingreso" ? "+" : "-"}U$S {mov.monto.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Wallet className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No hay movimientos para mostrar</p>
            <p className="text-gray-400 text-sm mt-1">
              Realiza compras o recibe reembolsos para ver tus movimientos aquí
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
