import SideBar from "@/components/public/SideBar";
import Footer from "@/components/public/Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SideBar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}