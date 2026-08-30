import React from "react";
import type { Zone } from "../types";

function zoneColor(m: number) {
  if (m < 25) return "#6b0f0f"; // muted red
  if (m < 35) return "#7a5b1a"; // amber
  return "#20504f"; // muted green
}

export default function FieldMap({ zones, onSelect, selectedZone }: { zones: Zone[]; onSelect: (id: string) => void; selectedZone: string | null }) {
  return (
    <div className="w-full">
      <div className="bg-black/40 p-4 rounded-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 max-h-[420px] overflow-y-auto p-2">
          {zones.map((z) => {
            const fill = zoneColor(z.moisture);
            const isSelected = selectedZone === z.id;
            return (
              <button key={z.id} onClick={() => onSelect(z.id)} className={`text-left p-4 rounded-md transition-colors border ${isSelected ? 'ring-2 ring-white/20' : 'border-transparent'}`} style={{ background: fill }}>
                <div className="text-sm text-zinc-100 font-semibold">{z.name}</div>
                <div className="text-2xl font-bold text-white mt-2">{Math.round(z.moisture)}%</div>
                <div className="text-xs text-zinc-200 mt-1">{z.sensorStatus === 'operational' ? 'Saludable' : z.sensorStatus === 'warning' ? 'Aviso' : 'Crítico'}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
