//app/(shop)/producto/hooks/useProducts.ts
import { useState, useEffect } from 'react';

//Data simulada -- Eliminar cuando se integre con la API
const mockProductos = {
  id: "prod_123",
  slug: "apple-airpods-4-auriculares",
  marca: "Apple",
  titulo: "Apple AirPods 4 Auriculares Inalámbricos, con Cancelación de Ruido",
  precioOriginal: 480.22,
  precioDescuento: 368.54,
  descuento: 23,
  imagenes: [
    "https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/51r26t2jKQL._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/61k3tJ7X41L._SL1500_.jpg",
  ],
  atributos: [
    { nombre: "Style", opciones: ["With Active Noise Cancellation", "Without Active Noise Cancellation"] },
    { nombre: "Set", opciones: ["With AppleCare+", "Without AppleCare+"] },
  ],
  detalles: {
    disponibilidad: "En stock", peso: "0.12 kg", devolucion: "Sí", condicion: "Nuevo", origen: "Amazon", viajaDesde: "USA",
  },
  descripcion: "RECONSTRUIDOS PARA EL CONFORT — Los AirPods 4 han sido rediseñados para un confort excepcional..."
};

export function useProducts(slug: string) {
    const [producto, setProducto] = useState(mockProductos);
    const [loading, setLoading] = useState(false);
    const [imagenActiva, setImagenActiva] = useState(0);
    const [atributosSeleccionados, setAtributosSeleccionados] = useState<Record<string, string>>({});
    const [cantidad, setCantidad] = useState(1);

    //Simulacion de carga de producto -- Reemplazar con llamada a API
    useEffect(() => {
        //setLoading(true);
        //fetchProducto(slug).then(data => {
        //    setProducto(data);
        //    setLoading(false);
        //});
        console.log("Cargando producto con slug:", slug);
    }, [slug]);

    const seleccionarAtributo = (atributo: string, opcion: string) => {
        setAtributosSeleccionados(prev => ({ ...prev, [atributo]: opcion }));
    }

    const handleAgregarAlCarrito = () => {
    }

    return {
        producto,
        loading,
        imagenActiva,
        setImagenActiva,
        atributosSeleccionados,
        seleccionarAtributo,
        cantidad,
        setCantidad,
        handleAgregarAlCarrito,
    };
}