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

  // 1. NEW: Track the current style so we know which button to show
  const [currentStyle, setCurrentStyle] = useState<'light' | 'satellite'>('light');



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
const eventLocations: LocationData[] = [];

    if (map.current || !mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [11.5820, 48.1351],
      zoom: 10,
    });

    const getEvents = async () => {
      const {data,error} = await supabase
      .from("events")
      .select("id, country, lat, lon, title")

      if (data){
        data.forEach((item)=> (
            eventLocations.push(
                {id: item.id,
          name: item.title,
          latitude: item.lat,
          longitude:item.lon,
          flagUrl: 'https://flagcdn.com/${(in).toLowerCase()}.svg`'
        })
        ))
      }
    }

    console.log(eventLocations)

    getEvents();



    const currentMap = map.current;

    eventLocations.forEach((loc) => {
      const el = document.createElement('div');
      el.className = 'marker-flag';
      el.style.cursor = 'pointer';
      el.innerHTML = `
        <div s{tyle="padding:4px; background-color:#EF4444; border-radius:50%; box-shadow:0 4px 6px rgba(0,0,0,0.2); border:1px solid white; transition: transform 0.2s;">
          <img src="${loc.flagUrl}" style="width:32px; height:32px; border-radius:50%; object-fit:cover; display:block;" />
        </div>
      `;

      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<h3 style="font-weight:bold; color:black;">${loc.name}</h3><p style="color:gray; font-size:12px;">Click for details</p>`);

      new mapboxgl.Marker(el)
        .setLngLat([loc.longitude, loc.latitude])
        .setPopup(popup)
        .addTo(currentMap);
    });

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

  }, []);

  return (
    <div className="w-full h-96 rounded-xl overflow-hidden border-2 border-[#26667F] shadow-lg relative"
      style={{ width: '100%', height: '500px' }}
    >
      <div ref={mapContainer} className="w-full h-full" />

      {/* --- 3. GOOGLE MAPS STYLE TOGGLE --- */}
      <div className="absolute bottom-6 left-4 z-10 group">
        {currentStyle === 'light' ? (
          // BUTTON: SWITCH TO SATELLITE
          <div
            onClick={() => setMapStyle('satellite')}
            className="w-16 h-16 rounded-lg border-2 border-white shadow-xl cursor-pointer overflow-hidden relative transition-transform hover:scale-105 bg-gray-900 ring-1 ring-black/10"
          >
            {/* Dynamic Thumbnail from Mapbox API */}
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
             {/* Dynamic Thumbnail from Mapbox API */}
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