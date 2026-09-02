"use client";
import React, { useState } from "react";
import type { AIRecommendation, Zone } from "../types";

const PRIORITY_STYLE: Record<AIRecommendation["priority"], string> = {
  HIGH: "bg-red-500/15 text-red-300 ring-1 ring-red-500/30",
  MEDIUM: "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30",
  LOW: "bg-zinc-500/15 text-zinc-300 ring-1 ring-zinc-500/30",
};

export default function AIAnalysis({ onAnalyze, recommendations, onSchedule, zones }: { onAnalyze: () => Promise<void> | void; recommendations: AIRecommendation[]; onSchedule: (zoneId: string, minutes: number) => void; zones: Zone[] }) {
  const [processing, setProcessing] = useState(false);
  const [scheduled, setScheduled] = useState<Record<string, boolean>>({});

  async function handle() {
    setProcessing(true);
    setScheduled({});
    await onAnalyze();
    setProcessing(false);
  }

  function handleSchedule(zoneId: string, minutes: number) {
    onSchedule(zoneId, minutes);
    setScheduled((prev) => ({ ...prev, [zoneId]: true }));
  }

  return (
    <div className="bg-zinc-900/60 border border-zinc-800/80 p-5 rounded-xl">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/20 flex items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-emerald-300">
              <path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" strokeLinecap="round" />
              <circle cx="12" cy="12" r="4" />
            </svg>
          </div>
          <div>
            <div className="text-[11px] tracking-wider text-zinc-500 font-medium">AI FIELD ANALYSIS</div>
            <div className="text-lg font-semibold text-zinc-50">Análisis de campo</div>
          </div>
        </div>
        <button
          onClick={handle}
          disabled={processing}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/50 text-zinc-950 font-medium rounded-lg text-sm transition-colors shrink-0"
        >
          {processing ? "Analizando…" : "Analizar campo"}
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {!processing && recommendations.length === 0 && (
          <div className="text-sm text-zinc-500 py-6 text-center">Sin recomendaciones. Ejecuta el análisis para obtener sugerencias de riego.</div>
        )}
        {processing && <div className="text-sm text-zinc-500 py-6 text-center">Analizando condiciones del campo…</div>}
        {recommendations.map((r) => (
          <div key={r.zoneId} className="p-3.5 bg-black/25 border border-zinc-800/60 rounded-lg">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm text-zinc-400">{zones.find((z) => z.id === r.zoneId)?.name}</div>
                <div className="text-sm text-zinc-100 mt-0.5">
                  Riego recomendado: <strong className="font-semibold">{r.minutes} min</strong>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-sm font-medium text-zinc-100">{r.estimatedLiters} L</div>
                <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[11px] font-medium ${PRIORITY_STYLE[r.priority]}`}>{r.priority}</span>
              </div>
            </div>
            <div className="mt-2 text-xs text-zinc-500">{r.reason}</div>
            <div className="mt-3">
              <button
                disabled={!!scheduled[r.zoneId]}
                className="px-3 py-1.5 bg-zinc-100/10 hover:bg-zinc-100/15 disabled:bg-emerald-500/15 disabled:text-emerald-300 text-zinc-200 rounded-md text-sm font-medium transition-colors"
                onClick={() => handleSchedule(r.zoneId, r.minutes)}
              >
                {scheduled[r.zoneId] ? "Riego programado ✓" : "Programar riego"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
