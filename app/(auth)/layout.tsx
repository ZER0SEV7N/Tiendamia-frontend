export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FF3C3C]">
      <main className="flex-1 flex flex-col items-center py-10 px-4">
        {/* Logo de Tiendamia*/}
        <div className="flex flex-col items-center mb-6 cursor-pointer select-none">
          <span className="text-3xl font-black tracking-tight text-white font-sans">
            tienda<span className="text-white font-extrabold">mia</span>
          </span>
          <div className="w-16 h-1 bg-[#7000FF] rounded-full -mt-1 self-end mr-1" />
        </div>
        {children}
      </main>
    </div>
  );
}