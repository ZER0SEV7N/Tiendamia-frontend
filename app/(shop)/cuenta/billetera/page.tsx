import SidebarCuenta from "@/app/(shop)/cuenta/components/cuenta/SidebarCuenta";
import Billetera from "@/app/(shop)/cuenta/components/cuenta/Billetera";

export default function Page() {
  return (
    <div className="flex">
      <SidebarCuenta />

      <Billetera />
    </div>
  );
}
