import React from "react";
import type { Zone } from "../types";

function statusStyle(status: Zone["sensorStatus"]) {
  if (status === "critical") return { bg: "bg-red-950/60", border: "border-red-800/60", dot: "bg-red-400", label: "Crítico" };
  if (status === "warning") return { bg: "bg-amber-950/50", border: "border-amber-800/50", dot: "bg-amber-400", label: "Aviso" };
  return { bg: "bg-emerald-950/40", border: "border-emerald-900/50", dot: "bg-emerald-400", label: "Saludable" };
}

const LEGEND: Array<{ dot: string; label: string }> = [
  { dot: "bg-emerald-400", label: "Saludable" },
  { dot: "bg-amber-400", label: "Aviso" },
  { dot: "bg-red-400", label: "Crítico" },
];

export default function FieldMap({ zones, onSelect, selectedZone }: { zones: Zone[]; onSelect: (id: string) => void; selectedZone: string | null }) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-3">
        {LEGEND.map((l) => (
          <div key={l.label} className="flex items-center gap-1.5 text-xs text-zinc-400">
            <span className={`w-2 h-2 rounded-full ${l.dot}`} />
            {l.label}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {zones.map((z) => {
          const s = statusStyle(z.sensorStatus);
          const isSelected = selectedZone === z.id;
          return (
            <button
              key={z.id}
              onClick={() => onSelect(z.id)}
              className={`text-left p-3.5 rounded-lg border transition-all ${s.bg} ${
                isSelected ? "border-emerald-400/60 ring-1 ring-emerald-400/40" : `${s.border} hover:border-zinc-600`
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="text-xs font-medium text-zinc-300 truncate">{z.name}</div>
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} />
              </div>
              <div className="text-2xl font-bold text-zinc-50 mt-1.5">{Math.round(z.moisture)}%</div>
              <div className="text-[11px] text-zinc-400 mt-1">{s.label}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
