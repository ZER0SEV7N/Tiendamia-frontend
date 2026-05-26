"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader, MapPin, Trash2, Plus, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { Direccion } from "../../types/direccion";

export default function MisDireccionesView() {
  const router = useRouter();
  const [direcciones, setDirecciones] = useState<Direccion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    fetchDirecciones();
  }, []);

  const fetchDirecciones = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/usuario/direcciones");
      setDirecciones(response.data);
      setError(null);
    } catch (err: any) {
      console.error("Error cargando direcciones:", err);
      setError("No se pudieron cargar tus direcciones");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta dirección?")) {
      return;
    }

    try {
      setDeletingId(id);
      await api.delete(`/api/usuario/direcciones/${id}`);
      setDirecciones(direcciones.filter((d) => d.id !== id));
    } catch (err: any) {
      console.error("Error eliminando dirección:", err);
      setError("No se pudo eliminar la dirección");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl font-sans pl-2 pb-10">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">Mis direcciones</h1>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl font-sans pl-2 pb-10 animate-in fade-in-50 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mis direcciones</h1>
        <Button
          onClick={() => router.push("/perfil/direcciones/nuevo")}
          className="bg-[#FF3C3C] hover:bg-red-600 text-white font-bold gap-2 transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          Agregar dirección
        </Button>
      </div>

      {/* Mensaje de Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6 flex items-gap-3 animate-in shake">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Listado de Direcciones */}
      {direcciones.length > 0 ? (
        <div className="space-y-4">
          {direcciones.map((dir, idx) => (
            <div
              key={dir.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300 animate-in slide-in-from-left"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {dir.direccion}
                    </h3>
                    {dir.referencia && (
                      <p className="text-sm text-gray-600 mb-3">
                        📍 {dir.referencia}
                      </p>
                    )}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div className="text-gray-600">
                        <p className="text-xs text-gray-500 font-medium">DISTRITO</p>
                        <p className="font-semibold text-gray-900">{dir.distrito}</p>
                      </div>
                      <div className="text-gray-600">
                        <p className="text-xs text-gray-500 font-medium">PROVINCIA</p>
                        <p className="font-semibold text-gray-900">{dir.provincia}</p>
                      </div>
                      <div className="text-gray-600">
                        <p className="text-xs text-gray-500 font-medium">DEPARTAMENTO</p>
                        <p className="font-semibold text-gray-900">{dir.departamento}</p>
                      </div>
                      <div className="text-gray-600">
                        <p className="text-xs text-gray-500 font-medium">REGISTRADA</p>
                        <p className="font-semibold text-gray-900">
                          {new Date(dir.createAt).toLocaleDateString("es-PE")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badge y Acciones */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  {dir.es_principal && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                      ✓ Dirección Principal
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() =>
                      router.push(`/perfil/direcciones/${dir.id}/editar`)
                    }
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded-md transition-all duration-200"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => handleDelete(dir.id)}
                    disabled={deletingId === dir.id}
                    className="bg-red-50 hover:bg-red-100 text-red-600 font-medium px-4 py-2 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {deletingId === dir.id ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        Eliminando...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4" />
                        Eliminar
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
          <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No tienes direcciones registradas
          </h3>
          <p className="text-gray-600 mb-6">
            Agrega una dirección para poder hacer compras o recibir envíos
          </p>
          <Button
            onClick={() => router.push("/perfil/direcciones/nuevo")}
            className="bg-[#FF3C3C] hover:bg-red-600 text-white font-bold gap-2"
          >
            <Plus className="w-4 h-4" />
            Agregar Primera Dirección
          </Button>
        </div>
      )}
    </div>
  );
}
