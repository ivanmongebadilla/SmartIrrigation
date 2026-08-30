import { DashboardState, Zone, SensorReading, WeatherData, IrrigationEvent, AIRecommendation, AlertItem } from "../types";

function nowTs() {
  return Date.now();
}

function makeZone(i: number, moistureOverride?: number): Zone {
  const base = 30 + Math.round(Math.random() * 50);
  const moisture = typeof moistureOverride === "number" ? moistureOverride : Math.max(8, Math.min(92, base + Math.round((Math.random() - 0.5) * 12)));
  return {
    id: `zone-${String(i).padStart(2, "0")}`,
    name: `Zona ${String(i).padStart(2, "0")}`,
    moisture,
    temperature: 25 + Math.round(Math.random() * 12) + Math.random(),
    humidity: 25 + Math.round(Math.random() * 50),
    waterFlow: Math.round(20 + Math.random() * 120),
    lastIrrigation: new Date(nowTs() - Math.round(Math.random() * 1000 * 60 * 60 * 24)).toLocaleString(),
    nextIrrigation: null,
    sensorStatus: moisture < 30 ? (moisture < 20 ? "critical" : "warning") : "operational",
  };
}

export function createMockState(): DashboardState {
  const zones: Zone[] = [];
  for (let i = 1; i <= 18; i++) {
    if (i === 4) zones.push(makeZone(i, 24)); // intentionally low moisture
    else zones.push(makeZone(i));
  }

  const sensors: SensorReading[] = zones.flatMap((z) => [
    { zoneId: z.id, type: "moisture", value: z.moisture, timestamp: nowTs() },
    { zoneId: z.id, type: "temperature", value: Math.round(z.temperature * 10) / 10, timestamp: nowTs() },
    { zoneId: z.id, type: "humidity", value: Math.round(z.humidity), timestamp: nowTs() },
    { zoneId: z.id, type: "waterFlow", value: Math.round(z.waterFlow), timestamp: nowTs() },
  ]);

  const weather: WeatherData = {
    temperature: 31,
    humidity: 34,
    windKph: 12,
    rainProbability: 10,
    forecast: [
      { time: "+1h", temp: 31, rainProb: 8 },
      { time: "+3h", temp: 30, rainProb: 12 },
      { time: "+6h", temp: 29, rainProb: 6 },
    ],
  };

  const irrigationHistory: IrrigationEvent[] = [
    { zoneId: "zone-07", durationMinutes: 12, volumeLiters: 280, time: new Date(nowTs() - 1000 * 60 * 60 * 5).toLocaleString() },
    { zoneId: "zone-03", durationMinutes: 20, volumeLiters: 400, time: new Date(nowTs() - 1000 * 60 * 60 * 10).toLocaleString() },
  ];

  const recommendations: AIRecommendation[] = [];

  const alerts: AlertItem[] = [
    { id: "a1", level: "WARNING", title: "Zona 04 humedad por debajo del umbral", detail: "Humedad del suelo 24%", time: new Date().toLocaleString() },
    { id: "a2", level: "INFO", title: "Zona 07 riego completado", detail: "Duración 12 min", time: new Date().toLocaleString() },
  ];

  return { zones, sensors, weather, irrigationHistory, recommendations, alerts };
}
