"use client";

import { cn } from "@/lib/utils";
import { MapContainer, TileLayer, Polyline, Circle } from "react-leaflet";

interface MiniMapProps {
  polygon: string;
  lat: number;
  lng: number;
  className?: string;
}

function parseGeoPolygon(str: string): [number, number][] {
  return str
    .replace(/[()]/g, "") // Remove all parentheses
    .split(",") // Split into all numbers
    .reduce<string[]>((acc, val) => {
      const trimmed = val.trim();
      if (trimmed !== "") acc.push(trimmed);
      return acc;
    }, [])
    .reduce<[number, number][]>((acc, val, index, arr) => {
      if (index % 2 === 0) {
        acc.push([parseFloat(arr[index + 1]), parseFloat(val)]);
      }
      return acc;
    }, []);
}

const MiniMap: React.FC<MiniMapProps> = ({ polygon, lat, lng, className }) => {
  const parsedPolygon = parseGeoPolygon(polygon);

  return (
    <div className={cn("overflow-hidden w-full h-44", className)}>
      <MapContainer
        center={[lat, lng]}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        // dragging={false}
        touchZoom={false}
        keyboard={false}
        boxZoom={false}
        zoom={14}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {parsedPolygon.length > 0 ? (
          <Polyline positions={parsedPolygon} />
        ) : (
          <Circle center={[lat, lng]} radius={500} />
        )}
      </MapContainer>
    </div>
  );
};

export default MiniMap;
