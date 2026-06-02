import ProfileSidebar from "@/components/ProfileSidebar";

export default function PerfilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-64">
            <ProfileSidebar />
          </aside>
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
