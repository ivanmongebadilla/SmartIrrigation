"use client";

import React, { useMemo } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
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
  const strokeColor = "#34d399";

  return (
    <div className="w-full h-48 sm:h-56">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
          <defs>
            <linearGradient id="moistureFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity={0.35} />
              <stop offset="100%" stopColor={strokeColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#27272a" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="time" tick={{ fill: "#71717a", fontSize: 11 }} axisLine={false} tickLine={false} interval={2} />
          <YAxis tick={{ fill: "#71717a", fontSize: 11 }} axisLine={false} tickLine={false} unit="%" width={38} />
          <Tooltip
            contentStyle={{ background: "#18181b", border: "1px solid #3f3f46", borderRadius: 8, fontSize: 12 }}
            labelStyle={{ color: "#a1a1aa" }}
            itemStyle={{ color: "#34d399" }}
          />
          <Area type="monotone" dataKey="moisture" stroke={strokeColor} strokeWidth={2} fill="url(#moistureFill)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
