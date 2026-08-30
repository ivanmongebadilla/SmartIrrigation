"use client";

import { useEffect, useMemo, useState } from "react";
import { createMockState } from "../data/mockData";
import type { DashboardState, AIRecommendation, Zone } from "../types";

export function useMockData() {
  // Start with a deterministic, empty placeholder during SSR to avoid hydration mismatch.
  const emptyState: DashboardState = {
    zones: [],
    sensors: [],
    weather: { temperature: 0, humidity: 0, windKph: 0, rainProbability: 0, forecast: [] },
    irrigationHistory: [],
    recommendations: [],
    alerts: [],
  };

  const [state, setState] = useState<DashboardState>(emptyState);
  const [lastUpdated, setLastUpdated] = useState<number>(0);

  // Initialize mock data on the client only.
  useEffect(() => {
    const initial = createMockState();
    setState(initial);
    setLastUpdated(Date.now());

    const t = setInterval(() => {
      setState((prev) => {
        if (!prev.zones.length) return prev;
        const zones = prev.zones.map((z) => {
          const jitter = (Math.random() - 0.5) * 2;
          let moisture = Math.max(5, Math.min(95, Math.round((z.moisture + jitter) * 10) / 10));
          if (z.id === "zone-04") moisture = Math.max(12, Math.round((moisture - Math.random() * 0.6) * 10) / 10);
          const temperature = Math.round((z.temperature + (Math.random() - 0.5) * 0.4) * 10) / 10;
          const humidity = Math.max(10, Math.min(98, Math.round((z.humidity + (Math.random() - 0.5) * 1.5))));
          const waterFlow = Math.max(0, Math.round((z.waterFlow + (Math.random() - 0.5) * 4)));
          return {
            ...z,
            moisture,
            temperature,
            humidity,
            waterFlow,
            sensorStatus: moisture < 20 ? "critical" : moisture < 30 ? "warning" : "operational",
          } as Zone;
        });

        const sensors = zones.flatMap((z) => [
          { zoneId: z.id, type: "moisture", value: z.moisture, timestamp: Date.now() },
          { zoneId: z.id, type: "temperature", value: z.temperature, timestamp: Date.now() },
          { zoneId: z.id, type: "humidity", value: z.humidity, timestamp: Date.now() },
          { zoneId: z.id, type: "waterFlow", value: z.waterFlow, timestamp: Date.now() },
        ]);

        setLastUpdated(Date.now());
        return { ...prev, zones, sensors };
      });
    }, 4500);

    return () => clearInterval(t);
  }, []);

  function analyzeField(): Promise<AIRecommendation[]> {
    return new Promise((resolve) => {
      // Use the current state at the moment of calling (client-only)
      setTimeout(() => {
        const recs: AIRecommendation[] = state.zones
          .filter((z) => z.moisture < 35)
          .map((z) => {
            const minutes = Math.max(6, Math.round((35 - z.moisture) * 0.7));
            const estimatedLiters = minutes * 23;
            return {
              zoneId: z.id,
              minutes,
              estimatedLiters,
              reason: `La humedad de ${z.name} ha decrecido y se requiere riego para recuperar niveles óptimos.`,
              priority: z.moisture < 25 ? "HIGH" : "MEDIUM",
              potentialSavingPercent: Math.round(8 + Math.random() * 6),
            };
          });
        resolve(recs);
      }, 1200 + Math.random() * 900);
    });
  }

  function scheduleIrrigation(zoneId: string, minutes: number) {
    setState((prev) => {
      const zones = prev.zones.map((z) => (z.id === zoneId ? { ...z, nextIrrigation: `${minutes} min` } : z));
      const irrigation = { zoneId, durationMinutes: minutes, volumeLiters: Math.round(minutes * 23), time: new Date().toLocaleString() };
      return { ...prev, zones, irrigationHistory: [irrigation, ...prev.irrigationHistory] };
    });
  }

  return { state, lastUpdated, analyzeField, scheduleIrrigation };
}
