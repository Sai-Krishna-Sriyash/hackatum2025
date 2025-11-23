"use client"
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {createClient} from "@/lib/client_supabase";

interface LocationData {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  flagUrl: string;
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

const EventMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const supabase = createClient();

  // FIX 1: Initialize state to 'satellite' to match the useEffect initialization
  const [currentStyle, setCurrentStyle] = useState<'light' | 'satellite'>('satellite');

  const setMapStyle = (style: 'light' | 'satellite') => {
    if (map.current) {
      const styleUrl = style === 'light'
        ? 'mapbox://styles/mapbox/light-v11'
        : 'mapbox://styles/mapbox/satellite-streets-v12';

      map.current.setStyle(styleUrl);
      setCurrentStyle(style);
    }
  };

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12', // Matches initial state now
      center: [11.5820, 48.1351],
      zoom: 10,
    });

    const currentMap = map.current;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                currentMap.flyTo({
                    center: [longitude, latitude],
                    zoom: 13,
                    essential: true
                });

                const userEl = document.createElement('div');
                userEl.innerHTML = `
                  <div style="display:flex; flex-direction:column; align-items:center;">
                    <div style="width:16px; height:16px; background-color:#3B82F6; border-radius:50%; border:2px solid white; box-shadow:0 4px 6px rgba(0,0,0,0.1);"></div>
                    <div style="font-size:10px; font-weight:bold; color:#2563EB; background:rgba(255,255,255,0.9); padding:2px 4px; border-radius:4px; margin-top:4px;">You</div>
                  </div>
                `;

                new mapboxgl.Marker(userEl)
                  .setLngLat([longitude, latitude])
                  .addTo(currentMap);
            },
            (error) => {
                console.error("Error getting location:", error);
            }
        );
    }

    const getEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("id, country,code, lat, lon, title");

      if (!data) return;

      data.forEach(item => {
        const flagUrl = `https://flagcdn.com/${item.code.toLowerCase()}.svg`;

        const el = document.createElement("div");
        el.className = "marker-flag";
        el.style.cursor = "pointer";
        
        // FIX 2: Fixed template literal syntax nesting
        el.innerHTML = `
          <div style="
            width:45px;
            height:45px;
            padding:0;
            background:#EF4444;
            border-radius:50%;
            overflow:hidden;              
            box-shadow:0 4px 6px rgba(0,0,0,0.2);
            border:1px solid white;
          ">
            <img src="${flagUrl}" 
              style="
                width:100%;
                height:100%;
                object-fit:cover;       
                display:block;
              "
            />
          </div>
        `;

        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<h3 style="font-weight:bold">${item.title}</h3>`);

        new mapboxgl.Marker(el)
          .setLngLat([item.lon, item.lat])
          .setPopup(popup)
          .addTo(currentMap);
      });
    };

    getEvents();
  }, [supabase]);

  

  return (
    <div className="w-full h-96 rounded-xl overflow-hidden border-2 border-[#26667F] shadow-lg relative"
      style={{ width: '100%', height: '500px' }}
    >
      <div ref={mapContainer} className="w-full h-full" />

      <div className="absolute bottom-6 left-4 z-10 group">
        {currentStyle === 'light' ? (
          // BUTTON: SWITCH TO SATELLITE
          <div
            onClick={() => setMapStyle('satellite')}
            className="w-16 h-16 rounded-lg border-2 border-white shadow-xl cursor-pointer overflow-hidden relative transition-transform hover:scale-105 bg-gray-900 ring-1 ring-black/10"
          >
            <img
              src={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/static/11.5820,48.1351,12,0/128x128?access_token=${mapboxgl.accessToken}`}
              alt="Satellite"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-black/50 backdrop-blur-[2px] text-white text-[10px] font-medium text-center py-1">
              Satellite
            </div>
          </div>
        ) : (
          // BUTTON: SWITCH TO MAP
          <div
            onClick={() => setMapStyle('light')}
            className="w-16 h-16 rounded-lg border-2 border-white shadow-xl cursor-pointer overflow-hidden relative transition-transform hover:scale-105 bg-gray-100 ring-1 ring-black/10"
          >
             <img
              src={`https://api.mapbox.com/styles/v1/mapbox/light-v11/static/11.5820,48.1351,12,0/128x128?access_token=${mapboxgl.accessToken}`}
              alt="Map"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur-[2px] text-gray-900 text-[10px] font-medium text-center py-1">
              Map
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default EventMap;