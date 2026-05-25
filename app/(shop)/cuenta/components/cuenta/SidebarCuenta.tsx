export default function SidebarCuenta() {
  return (
    <div className="w-64 p-5 border-r">
      <h2 className="text-2xl font-bold">Hola Yandel</h2>

      <ul className="mt-6 space-y-4">
        <li>Información</li>

        <li>Mis órdenes</li>

        <li className="text-red-500 font-bold">Mi billetera</li>

        <li>Favoritos</li>
      </ul>
    </div>
  );
}
