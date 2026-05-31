export default function Wishlist() {

  return (

    <div className="p-8 flex-1">

      <h1 className="text-3xl font-bold">
        Favoritos
      </h1>

      <p className="text-gray-500 mt-2">
        Guarda productos para comprarlos después
      </p>

      <div className="mt-10 border rounded-xl p-10 text-center">

        <h2 className="text-xl font-semibold">
          Tu lista está vacía
        </h2>

        <p className="text-gray-500 mt-3">
          Aún no agregaste productos a favoritos
        </p>

      </div>

    </div>

  )

}