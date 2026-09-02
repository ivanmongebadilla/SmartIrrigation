"use client";

import React, { useMemo } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import type { IrrigationEvent } from "../types";

function formatTime(raw: string) {
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  return d.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
}

export default function WaterUsageChart({ history }: { history: IrrigationEvent[] }) {
  const data = useMemo(() => {
    return history.slice(0, 10).map((h) => ({ label: formatTime(h.time), liters: h.volumeLiters }));
  }, [history]);

  const barColor = "#38bdf8";

  return (
    <div className="w-full h-48 sm:h-56">
      {data.length === 0 ? (
        <div className="h-full flex items-center justify-center text-sm text-zinc-500">Sin riegos registrados aún</div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
            <CartesianGrid stroke="#27272a" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="label" tick={{ fill: "#71717a", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#71717a", fontSize: 11 }} axisLine={false} tickLine={false} width={38} />
            <Tooltip
              contentStyle={{ background: "#18181b", border: "1px solid #3f3f46", borderRadius: 8, fontSize: 12 }}
              labelStyle={{ color: "#a1a1aa" }}
              itemStyle={{ color: "#38bdf8" }}
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
            />
            <Bar dataKey="liters" fill={barColor} radius={[4, 4, 0, 0]} maxBarSize={36} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
