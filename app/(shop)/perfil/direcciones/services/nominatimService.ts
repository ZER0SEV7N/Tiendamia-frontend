// src/services/nominatimService.ts

export interface LocationData {
  direccion: string;
  departamento: string;
  provincia: string;
  distrito: string;
  codigoPostal: string;
  lat: number;   
  lng: number;
}

export interface SearchResult {
  display_name: string;
  lat: string;
  lon: string;
}

/**
 * 1. BUSCADOR: Busca sugerencias de direcciones a partir de un texto
 */
export const searchAddressByText = async (query: string): Promise<SearchResult[]> => {
  if (!query || query.length < 3) return [];
  try {
    // Restringimos la búsqueda a Perú utilizando countrycodes=pe
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=pe&limit=5&addressdetails=1`,
      {
        headers: { 'Accept-Language': 'es', 'User-Agent': 'TiendamiaCloneApp' }
      }
    );
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("Error en el buscador de Nominatim:", error);
    return [];
  }
};

/**
 * 2. GEOPROCESADOR DE COORDENADAS: Obtiene los datos completos y desagregados para Perú
 */
export const getAddressFromCoordinates = async (lat: number, lng: number): Promise<LocationData> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
      {
        headers: { 'Accept-Language': 'es', 'User-Agent': 'TiendamiaCloneApp' }
      }
    );

    const data = await response.json();
    const addr = data.address || {};

    // 1. Extraer el Departamento / Región
    const departamento = addr.region || addr.state || addr.province || "Lima";

    // 2. Extraer la Provincia (Buscamos todas las opciones posibles que devuelve la API en Sudamérica)
    const provincia = addr.county || addr.city || addr.state_district || departamento;

    // 3. Extraer el Distrito (Revisamos minuciosamente todas las variantes de OpenStreetMap para distritos en Perú)
    const distrito = addr.suburb || 
                     addr.city_district || 
                     addr.town || 
                     addr.village || 
                     addr.neighbourhood || 
                     addr.municipality || 
                     provincia; // Salvavidas: si no se encuentra mapeado el distrito, usa la provincia antes de dejarlo vacío

    // 4. Formatear la dirección principal (Vía pública + Número si existe)
    let direccion = "";
    if (addr.road) {
      direccion = addr.house_number ? `${addr.road} ${addr.house_number}` : addr.road;
    } else {
      direccion = data.display_name ? data.display_name.split(',')[0] : "Dirección seleccionada";
    }

    return {
      direccion,
      departamento,
      provincia,
      distrito,
      codigoPostal: addr.postcode || "15001", // Código postal por defecto en Perú si viene vacío
      lat,
      lng
    };
  } catch (error) {
    console.error("Error en geocodificación inversa:", error);
    throw error;
  }
};