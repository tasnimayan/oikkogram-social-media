"use client";

import { useEffect, useRef } from "react";
import type { Event } from "@/lib/types";

interface EventMapProps {
  events: Event[];
  singleEvent?: boolean;
}

export function EventMap({ events, singleEvent = false }: EventMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // In a real app, you would use a mapping library like Google Maps, Mapbox, or Leaflet
    // For this demo, we'll just show a placeholder
    if (mapRef.current) {
      const mapElement = mapRef.current;

      // Create a simple placeholder map
      const canvas = document.createElement("canvas");
      canvas.width = mapElement.clientWidth;
      canvas.height = mapElement.clientHeight;
      mapElement.appendChild(canvas);

      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Draw map background
        ctx.fillStyle = "#e5e7eb";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw some fake roads
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 3;

        // Horizontal roads
        for (let i = 1; i < 5; i++) {
          ctx.beginPath();
          ctx.moveTo(0, (canvas.height / 5) * i);
          ctx.lineTo(canvas.width, (canvas.height / 5) * i);
          ctx.stroke();
        }

        // Vertical roads
        for (let i = 1; i < 5; i++) {
          ctx.beginPath();
          ctx.moveTo((canvas.width / 5) * i, 0);
          ctx.lineTo((canvas.width / 5) * i, canvas.height);
          ctx.stroke();
        }

        // Draw event markers
        events.forEach((_, index) => {
          const x = (canvas.width / 4) * ((index % 3) + 1);
          const y = (canvas.height / 4) * (Math.floor(index / 3) + 1);

          // Draw marker
          ctx.fillStyle = "#3b82f6";
          ctx.beginPath();
          ctx.arc(x, y, 8, 0, 2 * Math.PI);
          ctx.fill();

          // Draw pulse effect for single event
          if (singleEvent) {
            ctx.strokeStyle = "#3b82f6";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(x, y, 12, 0, 2 * Math.PI);
            ctx.stroke();

            ctx.strokeStyle = "rgba(59, 130, 246, 0.5)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(x, y, 16, 0, 2 * Math.PI);
            ctx.stroke();
          }
        });

        // Add text for single event
        if (singleEvent && events.length > 0) {
          ctx.fillStyle = "#111827";
          ctx.font = "14px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(events[0].location, canvas.width / 2, canvas.height - 20);
        }
      }

      return () => {
        if (canvas.parentNode === mapElement) {
          mapElement.removeChild(canvas);
        }
      };
    }
  }, [events, singleEvent]);

  return (
    <div ref={mapRef} className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
      {/* Map will be rendered here */}
    </div>
  );
}
