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

export default function Dashboard() {
  const { state, lastUpdated, analyzeField, scheduleIrrigation } = useMockData();
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);

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
    <div className="min-h-screen p-4 md:p-8">
      <Header />
      <div className="mt-6 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-12">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                <MetricCard label="Consumo de agua" value={`${overview.waterUsage.toLocaleString()} L`} />
                <MetricCard label="Humedad media" value={`${overview.avgMoisture}%`} />
                <MetricCard label="Zonas activas" value={`${overview.activeZones} / ${overview.totalZones}`} />
                <MetricCard label="Agua ahorrada" value={`${overview.waterSaved}%`} />
                <MetricCard label="Temperatura" value={`${overview.temperature}°C`} />
                <MetricCard label="Estado del sistema" value={overview.systemStatus} />
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-md">
            <h3 className="text-sm text-zinc-300 mb-4">Campo — Zonas de riego</h3>
            <FieldMap zones={state.zones} onSelect={(id: string) => setSelectedZone(id)} selectedZone={selectedZone} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-md">
              <h4 className="text-sm text-zinc-300 mb-3">Humedad (últimas 24h)</h4>
              <MoistureChart zones={state.zones} />
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-md">
              <h4 className="text-sm text-zinc-300 mb-3">Consumo de agua</h4>
              <WaterUsageChart history={state.irrigationHistory} />
            </div>
          </div>

          <div className="mt-4">
            <AIAnalysis onAnalyze={handleAnalyze} recommendations={recommendations} onSchedule={scheduleIrrigation} zones={state.zones} />
          </div>
        </div>

        <div className="col-span-4 space-y-4">
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-md">
            <h4 className="text-sm text-zinc-300 mb-2">Sensores</h4>
            <SensorOverview sensors={state.sensors} updatedAt={lastUpdated} />
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-md">
            <h4 className="text-sm text-zinc-200 mb-2">Clima</h4>
            <div className="text-xl sm:text-2xl font-medium text-zinc-50">{state.weather.temperature}°C</div>
            <div className="text-sm text-zinc-300">{state.weather.humidity}% humedad · {state.weather.windKph} km/h</div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-md">
            <h4 className="text-sm text-zinc-300 mb-2">Alertas</h4>
            <AlertsPanel alerts={state.alerts} />
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-md">
            <h4 className="text-sm text-zinc-300 mb-2">Automatización</h4>
            <div className="text-zinc-400 text-sm">Sensores → Datos → AI → Recomendación → Automatización</div>
          </div>
        </div>
      </div>

      {selectedZone && <ZoneDetails zone={state.zones.find((z) => z.id === selectedZone)!} onClose={() => setSelectedZone(null)} />}
    </div>
  );
}
