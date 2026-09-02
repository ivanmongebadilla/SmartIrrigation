import React from "react";

function mockForLabel(label: string) {
  const m: Record<string, string> = {
    "Consumo de agua": "12,480 L",
    "Humedad media": "43.8%",
    "Zonas activas": "8 / 12",
    "Agua ahorrada": "17.9%",
    "Temperatura": "31.8°C",
    "Estado del sistema": "Operativo",
  };
  return m[label] ?? "—";
}

function mockTrendForLabel(label: string) {
  const t: Record<string, number> = {
    "Consumo de agua": -2.4,
    "Humedad media": -1.5,
    "Zonas activas": 0,
    "Agua ahorrada": 1.2,
    "Temperatura": 0.6,
    "Estado del sistema": 0,
  };
  return t[label] ?? 0;
}

function mockUpdatedForLabel(label: string) {
  const u: Record<string, string> = {
    "Consumo de agua": "hace 4m",
    "Humedad media": "hace 1m",
    "Zonas activas": "hace 2m",
    "Agua ahorrada": "hoy",
    "Temperatura": "hace 3m",
    "Estado del sistema": "ahora",
  };
  return u[label] ?? "—";
}

const ICON_THEME: Record<string, { fg: string; bg: string; ring: string }> = {
  agua: { fg: "text-sky-300", bg: "bg-sky-500/10", ring: "ring-sky-500/20" },
  humedad: { fg: "text-emerald-300", bg: "bg-emerald-500/10", ring: "ring-emerald-500/20" },
  temperatura: { fg: "text-amber-300", bg: "bg-amber-500/10", ring: "ring-amber-500/20" },
  zonas: { fg: "text-violet-300", bg: "bg-violet-500/10", ring: "ring-violet-500/20" },
  sistema: { fg: "text-zinc-300", bg: "bg-zinc-500/10", ring: "ring-zinc-500/20" },
};

function themeForLabel(label: string) {
  const l = label.toLowerCase();
  if (l.includes("consumo") || l.includes("ahorrada")) return ICON_THEME.agua;
  if (l.includes("humedad")) return ICON_THEME.humedad;
  if (l.includes("temperatura")) return ICON_THEME.temperatura;
  if (l.includes("zonas")) return ICON_THEME.zonas;
  return ICON_THEME.sistema;
}

function Icon({ label, className }: { label: string; className?: string }) {
  const common = { width: 16, height: 16, fill: "none", stroke: "currentColor", strokeWidth: 1.6 } as const;
  const l = label.toLowerCase();
  if (l.includes("consumo") || l.includes("ahorrada")) {
    return (
      <svg {...common} viewBox="0 0 24 24" className={className}>
        <path d="M12 3s5 5.5 5 9a5 5 0 11-10 0c0-3.5 5-9 5-9z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (l.includes("humedad")) {
    return (
      <svg {...common} viewBox="0 0 24 24" className={className}>
        <path d="M12 2s6 6.5 6 10a6 6 0 11-12 0c0-3.5 6-10 6-10z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (l.includes("temperatura")) {
    return (
      <svg {...common} viewBox="0 0 24 24" className={className}>
        <rect x="9" y="2" width="6" height="12" rx="3" />
        <path d="M12 17v4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (l.includes("zonas")) {
    return (
      <svg {...common} viewBox="0 0 24 24" className={className}>
        <path d="M3 7h18M3 12h18M3 17h18" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg {...common} viewBox="0 0 24 24" className={className}>
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

export default function MetricCard({ label, value, trend, updated }: { label: string; value?: string | number; trend?: number; updated?: string }) {
  const display = String(value ?? mockForLabel(label));
  const t = typeof trend === "number" ? trend : mockTrendForLabel(label);
  const updatedText = updated ?? mockUpdatedForLabel(label);
  const trendPositive = t > 0;
  const theme = themeForLabel(label);

  const parts = display.split(" ");
  const hasUnit = parts.length > 1;
  const number = hasUnit ? parts.slice(0, -1).join(" ") : display;
  const unit = hasUnit ? parts.slice(-1).join(" ") : "";
  const valueSizeClass = number.length > 5 ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl";

  return (
    <div className="bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-xl hover:border-zinc-700/80 transition-colors">
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ring-1 ${theme.bg} ${theme.ring}`}>
          <Icon label={label} className={theme.fg} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium text-zinc-300 leading-snug">{label}</div>
          <div className="text-xs text-zinc-500 mt-1">{updatedText}</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline gap-1.5 min-w-0">
          <div className={`${valueSizeClass} font-semibold text-zinc-50 truncate`}>{number}</div>
          {hasUnit && <div className="text-base sm:text-lg text-zinc-400 shrink-0">{unit}</div>}
        </div>

        <div className={`mt-2 text-xs font-medium ${t === 0 ? "text-zinc-500" : trendPositive ? "text-emerald-400" : "text-amber-400"}`}>
          {t === 0 ? "Sin cambios" : trendPositive ? `▲ ${Math.abs(t)}%` : `▼ ${Math.abs(t)}%`}
        </div>
      </div>
    </div>
  );
}
