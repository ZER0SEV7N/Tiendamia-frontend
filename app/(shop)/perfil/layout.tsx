import ProfileSidebar from "@/components/ProfileSidebar";

export default function PerfilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Grid de dos columnas: Menú a la izquierda, Contenido a la derecha */}
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* El menú de la izquierda se mantiene FIJO en cualquier pestaña del perfil */}
          <ProfileSidebar />

          {/* El children cambiará dinámicamente según la subruta */}
          <main className="flex-1">
            {children}
          </main>
          
        </div>
      </div>
    </div>
  );
}                