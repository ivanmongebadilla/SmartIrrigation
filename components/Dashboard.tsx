"use client";

import React, { useState } from "react";
import { useMockData } from "../lib/useMockData";
import Header from "./Header";
import MetricCard from "./MetricCard";
import FieldMap from "./FieldMap";
import SensorOverview from "./SensorOverview";
import MoistureChart from "./MoistureChart";
import WaterUsageChart from "./WaterUsageChart";
import AIAnalysis from "./AIAnalysis";
import AlertsPanel from "./AlertsPanel";
import ZoneDetails from "./ZoneDetails";
import type { AIRecommendation } from "../types";

const PIPELINE_STEPS = ["Sensores", "Datos", "AI", "Recomendación", "Automatización"];

export default function Dashboard() {
  const { state, lastUpdated, analyzeField, scheduleIrrigation } = useMockData();
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);

  const totalZones = state.zones.length;
  const avgMoisture = totalZones ? Math.round((state.zones.reduce((s, z) => s + z.moisture, 0) / totalZones) * 10) / 10 : 0;
  const temperature = totalZones ? Math.round((state.zones.reduce((s, z) => s + z.temperature, 0) / totalZones) * 10) / 10 : 0;

  const overview = {
    waterUsage: 12480,
    avgMoisture,
    activeZones: state.zones.filter((z) => z.waterFlow > 0).length,
    totalZones,
    waterSaved: 17.9,
    temperature,
    systemStatus: "Operativo",
  };

  async function handleAnalyze() {
    const recs = await analyzeField();
    setRecommendations(recs);
  }

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-[1600px] mx-auto">
      <Header />
      <div className="mt-6 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-6 gap-4">
            <MetricCard label="Consumo de agua" value={`${overview.waterUsage.toLocaleString()} L`} />
            <MetricCard label="Humedad media" value={`${overview.avgMoisture}%`} />
            <MetricCard label="Zonas activas" value={`${overview.activeZones} / ${overview.totalZones}`} />
            <MetricCard label="Agua ahorrada" value={`${overview.waterSaved}%`} />
            <MetricCard label="Temperatura" value={`${overview.temperature}°C`} />
            <MetricCard label="Estado del sistema" value={overview.systemStatus} />
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800/80 p-5 rounded-xl">
            <h3 className="text-sm font-medium text-zinc-200 mb-4">Campo — Zonas de riego</h3>
            <FieldMap zones={state.zones} onSelect={(id: string) => setSelectedZone(id)} selectedZone={selectedZone} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-zinc-900/60 border border-zinc-800/80 p-5 rounded-xl">
              <h4 className="text-sm font-medium text-zinc-200 mb-1">Humedad</h4>
              <div className="text-xs text-zinc-500 mb-2">Últimas 24 horas</div>
              <MoistureChart zones={state.zones} />
            </div>
            <div className="bg-zinc-900/60 border border-zinc-800/80 p-5 rounded-xl">
              <h4 className="text-sm font-medium text-zinc-200 mb-1">Consumo de agua</h4>
              <div className="text-xs text-zinc-500 mb-2">Últimos riegos registrados</div>
              <WaterUsageChart history={state.irrigationHistory} />
            </div>
          </div>

          <AIAnalysis onAnalyze={handleAnalyze} recommendations={recommendations} onSchedule={scheduleIrrigation} zones={state.zones} />
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-4">
          <div className="bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-xl">
            <h4 className="text-sm font-medium text-zinc-200 mb-1">Sensores</h4>
            <SensorOverview sensors={state.sensors} updatedAt={lastUpdated} />
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-xl">
            <h4 className="text-sm font-medium text-zinc-200 mb-3">Clima</h4>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 ring-1 ring-sky-500/20 flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-sky-300">
                  <circle cx="12" cy="7" r="4" />
                  <path d="M4 21c0-3.3 3.6-6 8-6s8 2.7 8 6" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-semibold text-zinc-50">{state.weather.temperature}°C</div>
                <div className="text-xs text-zinc-400">{state.weather.humidity}% humedad · {state.weather.windKph} km/h</div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-xl">
            <h4 className="text-sm font-medium text-zinc-200 mb-3">Alertas</h4>
            <AlertsPanel alerts={state.alerts} />
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-xl">
            <h4 className="text-sm font-medium text-zinc-200 mb-3">Automatización</h4>
            <div className="flex flex-wrap items-center gap-1.5">
              {PIPELINE_STEPS.map((step, i) => (
                <React.Fragment key={step}>
                  <span className="px-2.5 py-1 rounded-full bg-black/25 border border-zinc-800/60 text-xs text-zinc-300">{step}</span>
                  {i < PIPELINE_STEPS.length - 1 && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-600 shrink-0">
                      <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedZone && <ZoneDetails zone={state.zones.find((z) => z.id === selectedZone)!} onClose={() => setSelectedZone(null)} />}
    </div>
  );
}
