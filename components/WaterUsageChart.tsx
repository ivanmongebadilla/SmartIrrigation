"use client";

import React, { useMemo } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import type { IrrigationEvent } from "../types";

export default function WaterUsageChart({ history }: { history: IrrigationEvent[] }) {
  const data = useMemo(() => {
    return history.slice(0, 10).map((h) => ({ label: h.time, liters: h.volumeLiters }));
  }, [history]);

  const barColor = "#9ca3af";

  return (
    <div className="w-full h-20 sm:h-28">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 6, right: 6, left: 0, bottom: 6 }}>
          <CartesianGrid stroke="transparent" />
          <XAxis dataKey="label" tick={{ fill: "#cbd5c1", fontSize: 12 }} axisLine={false} />
          <YAxis tick={{ fill: "#cbd5c1", fontSize: 12 }} axisLine={false} />
          <Tooltip wrapperStyle={{ background: "#0b0b0b", border: "1px solid #222" }} labelStyle={{ color: "#cbd5c1" }} />
          <Bar dataKey="liters" fill={barColor} radius={[4,4,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
