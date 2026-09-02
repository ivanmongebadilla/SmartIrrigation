import React from "react";
import type { Zone } from "../types";
import MoistureChart from "./MoistureChart";

const STATUS_LABEL: Record<Zone["sensorStatus"], { label: string; className: string }> = {
  operational: { label: "Saludable", className: "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30" },
  warning: { label: "Aviso", className: "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30" },
  critical: { label: "Crítico", className: "bg-red-500/15 text-red-300 ring-1 ring-red-500/30" },
};

const STATS: Array<{ key: keyof Zone; label: string; suffix: string }> = [
  { key: "moisture", label: "Humedad", suffix: "%" },
  { key: "temperature", label: "Temperatura", suffix: "°C" },
  { key: "humidity", label: "Humedad ambiental", suffix: "%" },
  { key: "waterFlow", label: "Flujo de agua", suffix: " L/min" },
];

export default function ZoneDetails({ zone, onClose }: { zone: Zone; onClose: () => void }) {
  const status = STATUS_LABEL[zone.sensorStatus];
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-zinc-900 border border-zinc-800 p-6 rounded-xl w-full max-w-4xl max-h-[85vh] overflow-y-auto scrollbar-thin shadow-2xl">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-xs text-zinc-500">Detalle de zona</div>
            <div className="flex items-center gap-2 mt-1">
              <h3 className="text-xl font-semibold text-zinc-50">{zone.name}</h3>
              <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${status.className}`}>{status.label}</span>
            </div>
          </div>
          <button
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STATS.map((s) => (
            <div key={s.label} className="p-3 bg-black/25 border border-zinc-800/60 rounded-lg">
              <div className="text-xs text-zinc-500">{s.label}</div>
              <div className="text-lg font-semibold text-zinc-50 mt-1">
                {zone[s.key]}
                {s.suffix}
              </div>
            </div>
          ))}
          <div className="p-3 bg-black/25 border border-zinc-800/60 rounded-lg">
            <div className="text-xs text-zinc-500">Último riego</div>
            <div className="text-sm font-medium text-zinc-100 mt-1">{zone.lastIrrigation ?? "—"}</div>
          </div>
          <div className="p-3 bg-black/25 border border-zinc-800/60 rounded-lg">
            <div className="text-xs text-zinc-500">Próximo riego</div>
            <div className="text-sm font-medium text-zinc-100 mt-1">{zone.nextIrrigation ?? "—"}</div>
          </div>
        </div>

        <div className="mt-5">
          <div className="text-sm text-zinc-300 mb-2">Historial de humedad (24h)</div>
          <div className="bg-black/20 border border-zinc-800/60 rounded-lg p-2">
            <MoistureChart zones={[zone]} />
          </div>
        </div>
      </div>
    </div>
  );
}
