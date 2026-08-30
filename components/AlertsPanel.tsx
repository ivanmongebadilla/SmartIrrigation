import React from "react";
import type { AlertItem } from "../types";

export default function AlertsPanel({ alerts }: { alerts: AlertItem[] }) {
  return (
    <div className="space-y-2">
      {alerts.map((a) => (
        <div
          key={a.id}
          className={`p-3 rounded ${a.level === "WARNING" ? "bg-amber-900/20" : a.level === "CRITICAL" ? "bg-red-900/20" : "bg-black/20"}`}>
          <div className="text-sm font-semibold text-zinc-100">{a.title}</div>
          <div className="text-xs text-zinc-300 mt-1">{a.detail}</div>
        </div>
      ))}
    </div>
  );
}
