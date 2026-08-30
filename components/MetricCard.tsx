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

export default function MetricCard({ label, value, trend, updated }: { label: string; value?: string | number; trend?: number; updated?: string }) {
  const display = value ?? mockForLabel(label);
  const t = typeof trend === "number" ? trend : mockTrendForLabel(label);
  const updatedText = updated ?? mockUpdatedForLabel(label);
  const trendPositive = t > 0;

  function Icon() {
    const common = { width: 16, height: 16, fill: "none", stroke: "currentColor", strokeWidth: 1.5 } as any;
    if (label.includes("Agua") || label.includes("Consumo") || label.includes("agua")) {
      return (
        <svg {...common} viewBox="0 0 24 24" className="text-emerald-300">
          <path d="M12 3s5 5.5 5 9a5 5 0 11-10 0c0-3.5 5-9 5-9z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    if (label.includes("Humedad") || label.includes("humedad")) {
      return (
        <svg {...common} viewBox="0 0 24 24" className="text-sky-300">
          <path d="M12 2s6 6.5 6 10a6 6 0 11-12 0c0-3.5 6-10 6-10z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    if (label.includes("Temperatura") || label.includes("Temperatura")) {
      return (
        <svg {...common} viewBox="0 0 24 24" className="text-amber-300">
          <rect x="9" y="2" width="6" height="12" rx="3" />
          <path d="M12 17v4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    if (label.includes("Zonas") || label.includes("Zonas")) {
      return (
        <svg {...common} viewBox="0 0 24 24" className="text-zinc-300">
          <path d="M3 7h18M3 12h18M3 17h18" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    // default
    return (
      <svg {...common} viewBox="0 0 24 24" className="text-zinc-300">
        <circle cx="12" cy="12" r="8" />
      </svg>
    );
  }

  return (
    <div className="col-span-1 bg-zinc-900 border border-zinc-800 p-3 rounded-md">
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 flex items-center justify-center text-zinc-200">
          <Icon />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-zinc-200">{label}</div>
          <div className="text-xs text-zinc-400 mt-1">{updatedText}</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline gap-2 whitespace-nowrap">
          {/* value and unit - keep on single line */}
          {(() => {
            const parts = String(display).split(" ");
            if (parts.length > 1) {
              const unit = parts.slice(-1).join(" ");
              const number = parts.slice(0, -1).join(" ");
              return (
                <>
                  <div className="text-3xl sm:text-4xl font-semibold text-zinc-50">{number}</div>
                  <div className="text-xl sm:text-2xl text-zinc-300">{unit}</div>
                </>
              );
            }
            return <div className="text-3xl sm:text-4xl font-semibold text-zinc-50">{display}</div>;
          })()}
        </div>

        <div className={`mt-2 text-sm sm:text-base ${t === 0 ? 'text-zinc-400' : trendPositive ? 'text-emerald-400' : 'text-amber-400'}`}>{t === 0 ? "—" : (trendPositive ? `▲ ${Math.abs(t)}%` : `▼ ${Math.abs(t)}%`)}</div>
      </div>
    </div>
  );
}
