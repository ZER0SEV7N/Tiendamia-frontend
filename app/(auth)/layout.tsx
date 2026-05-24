// Layout para páginas de auth
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full bg-[#FF3C3C] flex items-center justify-center py-3 shadow-md">
        <div className="flex flex-col items-center cursor-pointer select-none">
          <span className="text-2xl font-black tracking-tight text-white font-sans">
            tienda<span className="text-white font-extrabold">mia</span>
          </span>
          <div className="w-14 h-1 bg-[#7000FF] rounded-full -mt-1 self-end mr-1" />
        </div>
      </header>
      <main className="flex-1 bg-white">
        {children}
      </main>
    </div>
  );
}
