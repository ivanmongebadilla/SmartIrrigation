import React from "react";
import type { Zone } from "../types";

export default function ZoneDetails({ zone, onClose }: { zone: Zone; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-zinc-900 border border-zinc-800 p-6 rounded-md w-11/12 max-w-6xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-xs text-zinc-400">Detalle de zona</div>
            <h3 className="text-xl font-semibold">{zone.name}</h3>
          </div>
          <button className="text-zinc-400" onClick={onClose}>Cerrar</button>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          <div className="p-3 bg-black/20 rounded">
            <div className="text-xs text-zinc-400">Humedad</div>
            <div className="text-lg font-medium text-zinc-50">{zone.moisture}%</div>
          </div>
          <div className="p-3 bg-black/20 rounded">
            <div className="text-xs text-zinc-400">Temperatura</div>
            <div className="text-lg font-medium text-zinc-50">{zone.temperature}°C</div>
          </div>
          <div className="p-3 bg-black/20 rounded">
            <div className="text-xs text-zinc-400">Humedad ambiental</div>
            <div className="text-lg font-medium text-zinc-50">{zone.humidity}%</div>
          </div>
          <div className="p-3 bg-black/20 rounded">
            <div className="text-xs text-zinc-400">Flujo de agua</div>
            <div className="text-lg font-medium text-zinc-50">{zone.waterFlow} L/min</div>
          </div>
          <div className="p-3 bg-black/20 rounded">
            <div className="text-xs text-zinc-400">Último riego</div>
            <div className="text-lg font-medium text-zinc-50">{zone.lastIrrigation}</div>
          </div>
          <div className="p-3 bg-black/20 rounded">
            <div className="text-xs text-zinc-400">Próximo riego</div>
            <div className="text-lg font-medium text-zinc-50">{zone.nextIrrigation ?? "—"}</div>
          </div>

          <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-3 xl:col-span-6 p-3">
            <div className="text-sm text-zinc-300">Historial de humedad</div>
            <div className="h-36 bg-black/20 rounded-md mt-2 flex items-center justify-center text-xs text-zinc-500">(Gráfico simple)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
