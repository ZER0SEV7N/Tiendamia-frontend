// src/components/public/address/FreeAddressMap.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Search, MapPin } from 'lucide-react';
import { getAddressFromCoordinates, searchAddressByText, LocationData, SearchResult } from '../services/nominatimService';

const markerIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface FreeAddressMapProps {
  onLocationResolved: (datos: LocationData) => void;
  onError?: (mensaje: string) => void;
}

export default function FreeAddressMap({ onLocationResolved, onError }: FreeAddressMapProps) {
  const [position, setPosition] = useState<[number, number]>([-12.046374, -77.042793]); // Lima
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const [isResolving, setIsResolving] = useState(false);
  
  // Estados para el buscador predictivo
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Efecto "Debounce" para no saturar la API gratuita mientras el usuario escribe
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length >= 3) {
        const results = await searchAddressByText(searchQuery);
        setSearchResults(results);
        setShowDropdown(true);
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    }, 400); // Espera 400ms después de que el usuario deja de escribir

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Función cuando el usuario selecciona una dirección de la lista del buscador
  const handleSelectSuggestion = async (result: SearchResult) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    
    setPosition([lat, lng]);
    setSearchQuery(result.display_name);
    setShowDropdown(false);
    
    // Mover la cámara del mapa a la ubicación encontrada
    if (mapInstance) {
      mapInstance.setView([lat, lng], 16);
    }

    setIsResolving(true);
    try {
      const fullData = await getAddressFromCoordinates(lat, lng);
      onLocationResolved(fullData);
    } catch (err) {
      if (onError) onError("Error al procesar la dirección seleccionada.");
    } finally {
      setIsResolving(false);
    }
  };

  // Escuchador del Clic físico en el mapa
  function MapClickHandler() {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        setIsResolving(true);
        setSearchQuery(''); // Limpia el buscador si prefiere usar el clic

        try {
          const locationData = await getAddressFromCoordinates(lat, lng);
          onLocationResolved(locationData);
        } catch (err) {
          if (onError) onError("No se pudo obtener la dirección exacta de este punto.");
        } finally {
          setIsResolving(false);
        }
      },
    });
    return null;
  }

  return (
    <div className="space-y-3 border border-neutral-200 p-4 rounded-lg bg-neutral-50 relative">
      
      {/* BARRA DE BÚSQUEDA PREDICTIVA */}
      <div className="flex flex-col gap-1 relative z-50">
        <label className="text-sm font-medium text-neutral-700 flex justify-between items-center select-none">
          <span>Buscar dirección o ciudad en Perú:</span>
          {isResolving && <span className="text-xs text-[#FF3C3C] animate-pulse font-semibold">Cargando datos...</span>}
        </label>
        
        <div className="flex rounded-md border border-neutral-300 bg-white items-center px-3 focus-within:ring-2 focus-within:ring-neutral-400 focus-within:border-transparent transition-all h-12">
          <Search className="w-5 h-5 text-neutral-400 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Ej: Av. Javier Prado Este 2465, San Borja..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.length >= 3 && setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // Delay para permitir el click
            className="w-full bg-transparent text-sm text-neutral-800 outline-none placeholder:text-neutral-400 h-full"
          />
        </div>

        {/* LISTA DESPLEGABLE DE SUGERENCIAS */}
        {showDropdown && searchResults.length > 0 && (
          <div className="absolute top-[4.2rem] left-0 right-0 bg-white border border-neutral-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {searchResults.map((result, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSelectSuggestion(result)}
                className="w-full text-left px-4 py-3 text-sm hover:bg-neutral-50 border-b border-neutral-100 last:border-b-0 flex items-start gap-2 text-neutral-700 transition-colors"
              >
                <MapPin className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                <span className="truncate">{result.display_name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* EL MAPA VISUAL */}
      <div className="w-full h-64 rounded-md overflow-hidden border border-neutral-300 relative z-0">
        <MapContainer 
          center={position} 
          zoom={14} 
          style={{ height: '100%', width: '100%' }}
          ref={setMapInstance} // Guardamos la referencia para poder mover la cámara desde el buscador
        >
          <TileLayer 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
            attribution='&copy; OpenStreetMap' 
          />
          <Marker position={position} icon={markerIcon} />
          <MapClickHandler />
        </MapContainer>
      </div>
      
      <p className="text-xs text-neutral-500 select-none">
        * Tip: Puedes escribir tu dirección arriba o arrastrar/hacer clic en cualquier punto del mapa para ajustar el marcador.
      </p>
    </div>
  );
}