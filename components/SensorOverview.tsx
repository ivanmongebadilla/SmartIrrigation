import React, { useEffect, useState } from "react";
import type { SensorReading } from "../types";

function moistureColor(v: number) {
  if (v < 25) return "text-red-400";
  if (v < 35) return "text-amber-400";
  return "text-emerald-400";
}

export default function SensorOverview({ sensors, updatedAt }: { sensors: SensorReading[]; updatedAt: number }) {
  const list = sensors.filter((s) => s.type === "moisture").slice(0, 6);

  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const updatedText = updatedAt && now ? `${Math.round((now - updatedAt) / 1000)}s` : "—";
  return (
    <div>
      <div className="text-xs text-zinc-500 mb-3">Lecturas en vivo · hace {updatedText}</div>
      <div className="space-y-1.5">
        {list.length === 0 ? (
          <div className="text-sm text-zinc-500 py-2">Sin datos de sensores</div>
        ) : (
          list.map((s) => (
            <div key={s.zoneId} className="flex items-center justify-between px-2.5 py-2 rounded-md hover:bg-black/20 transition-colors">
              <div className="text-sm text-zinc-300">{s.zoneId.replace("zone-", "Zona ")}</div>
              <div className={`text-sm font-semibold tabular-nums ${moistureColor(s.value)}`}>{s.value}%</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
