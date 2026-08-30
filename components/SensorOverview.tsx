import React from "react";
import type { SensorReading } from "../types";

function niceLabel(t: string) {
  if (t === "moisture") return "Humedad";
  if (t === "temperature") return "Temperatura";
  if (t === "humidity") return "Humedad ambiental";
  if (t === "waterFlow") return "Flujo de agua";
  return t;
}

export default function SensorOverview({ sensors, updatedAt }: { sensors: SensorReading[]; updatedAt: number }) {
  const list = sensors.filter((s) => s.type === "moisture").slice(0, 6);
  const updatedText = updatedAt ? `${Math.round((Date.now() - updatedAt) / 1000)}s` : "—";
  return (
    <div>
      <div className="text-xs text-zinc-400 mb-2">Lecturas en vivo · Última actualización {updatedText}</div>
      <div className="grid grid-cols-1 gap-2">
        {list.length === 0 ? (
          <div className="text-sm text-zinc-200">Sin datos de sensores</div>
        ) : (
          list.map((s) => (
            <div key={s.zoneId} className="flex items-center justify-between p-2 bg-black/20 rounded">
              <div className="text-sm text-zinc-200">{s.zoneId.replace("zone-", "Zona ")}</div>
              <div className="text-sm font-medium text-white">{s.value}%</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
