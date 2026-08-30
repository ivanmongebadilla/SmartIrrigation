"use client";

import React, { useMemo } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import type { Zone } from "../types";

function buildSeries(zones: Zone[]) {
  const points = 24;
  const avg = zones.length ? zones.reduce((s, z) => s + z.moisture, 0) / zones.length : 40;
  const data = [] as { time: string; moisture: number }[];
  for (let i = 0; i < points; i++) {
    const hour = (i + 1) % 24;
    const seasonal = Math.sin((i / points) * Math.PI * 2) * 6;
    const jitter = (Math.random() - 0.5) * 2;
    const v = Math.max(5, Math.min(95, Math.round((avg + seasonal + jitter) * 10) / 10));
    data.push({ time: `${hour}h`, moisture: v });
  }
  return data;
}

export default function MoistureChart({ zones }: { zones: Zone[] }) {
  const data = useMemo(() => buildSeries(zones), [zones]);
  const strokeColor = "#6ee7b7";

  return (
    <div className="w-full h-24 sm:h-28">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
          <CartesianGrid stroke="transparent" />
          <XAxis dataKey="time" tick={{ fill: "#cbd5c1", fontSize: 12 }} axisLine={false} />
          <YAxis tick={{ fill: "#cbd5c1", fontSize: 12 }} axisLine={false} unit="%" />
          <Tooltip wrapperStyle={{ background: "#0b0b0b", border: "1px solid #222" }} labelStyle={{ color: "#cbd5c1" }} />
          <Line type="monotone" dataKey="moisture" stroke={strokeColor} strokeWidth={2.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
