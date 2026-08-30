"use client";
import React, { useState } from "react";
import type { AIRecommendation, Zone } from "../types";

export default function AIAnalysis({ onAnalyze, recommendations, onSchedule, zones }: { onAnalyze: () => Promise<void> | void; recommendations: AIRecommendation[]; onSchedule: (zoneId: string, minutes: number) => void; zones: Zone[] }) {
  const [processing, setProcessing] = useState(false);

  async function handle() {
    setProcessing(true);
    await onAnalyze();
    setProcessing(false);
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-md">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-zinc-400">AI FIELD ANALYSIS</div>
          <div className="text-lg font-semibold">Análisis de campo</div>
        </div>
        <div>
          <button onClick={handle} className="px-3 py-2 bg-white/6 rounded text-sm">{processing ? "Analizando..." : "Analizar campo"}</button>
        </div>
      </div>

      <div className="mt-3 space-y-3">
        {recommendations.length === 0 && <div className="text-sm text-zinc-400">Sin recomendaciones. Ejecuta el análisis.</div>}
        {recommendations.map((r) => (
          <div key={r.zoneId} className="p-3 bg-black/20 rounded">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-zinc-300">{zones.find((z) => z.id === r.zoneId)?.name}</div>
                <div className="text-sm">Riego recomendado: <strong>{r.minutes} min</strong></div>
              </div>
              <div className="text-right">
                <div className="text-sm">{r.estimatedLiters} L</div>
                <div className="text-xs text-zinc-400">Prioridad: {r.priority}</div>
              </div>
            </div>
            <div className="mt-2 text-xs text-zinc-400">{r.reason}</div>
            <div className="mt-3 flex gap-2">
              <button className="px-3 py-1 bg-white/6 rounded text-sm" onClick={() => onSchedule(r.zoneId, r.minutes)}>Programar riego</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
