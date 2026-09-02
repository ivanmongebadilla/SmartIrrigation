import React from "react";
import type { AlertItem } from "../types";

const LEVEL_STYLE: Record<AlertItem["level"], { bg: string; border: string; icon: string }> = {
  CRITICAL: { bg: "bg-red-950/40", border: "border-red-900/50", icon: "text-red-400" },
  WARNING: { bg: "bg-amber-950/30", border: "border-amber-900/40", icon: "text-amber-400" },
  INFO: { bg: "bg-black/20", border: "border-zinc-800/60", icon: "text-sky-400" },
};

function AlertIcon({ level, className }: { level: AlertItem["level"]; className?: string }) {
  const common = { width: 15, height: 15, fill: "none", stroke: "currentColor", strokeWidth: 1.8 } as const;
  if (level === "CRITICAL" || level === "WARNING") {
    return (
      <svg {...common} viewBox="0 0 24 24" className={className}>
        <path d="M12 9v4M12 17h.01" strokeLinecap="round" />
        <path d="M10.3 3.9L2.5 17a2 2 0 001.7 3h15.6a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg {...common} viewBox="0 0 24 24" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8h.01M11 12h1v4h1" strokeLinecap="round" />
    </svg>
  );
}

function timeAgo(time: string) {
  const d = new Date(time);
  if (Number.isNaN(d.getTime())) return time;
  const mins = Math.round((Date.now() - d.getTime()) / 60000);
  if (mins < 1) return "ahora";
  if (mins < 60) return `hace ${mins}m`;
  const hours = Math.round(mins / 60);
  return `hace ${hours}h`;
}

export default function AlertsPanel({ alerts }: { alerts: AlertItem[] }) {
  if (alerts.length === 0) {
    return <div className="text-sm text-zinc-500 py-4 text-center">Sin alertas activas</div>;
  }
  return (
    <div className="space-y-2">
      {alerts.map((a) => {
        const s = LEVEL_STYLE[a.level];
        return (
          <div key={a.id} className={`p-3 rounded-lg border ${s.bg} ${s.border}`}>
            <div className="flex items-start gap-2">
              <AlertIcon level={a.level} className={`mt-0.5 shrink-0 ${s.icon}`} />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-sm font-medium text-zinc-100">{a.title}</div>
                  <div className="text-[11px] text-zinc-500 shrink-0">{timeAgo(a.time)}</div>
                </div>
                {a.detail && <div className="text-xs text-zinc-400 mt-0.5">{a.detail}</div>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
