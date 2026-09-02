import React from "react";

const NAV_ITEMS = ["Resumen", "Campo", "Analítica", "AI Insights", "Riego"];

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-4 pb-5 border-b border-zinc-800/80">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-emerald-400">
            <path d="M12 2.5s6.5 7 6.5 11.2a6.5 6.5 0 11-13 0C5.5 9.5 12 2.5 12 2.5z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-[11px] tracking-[0.2em] text-zinc-500 font-medium">MONNAVI</span>
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-zinc-50 leading-tight">Smart Irrigation</h1>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-1 text-sm">
        {NAV_ITEMS.map((item, i) => (
          <a
            key={item}
            href="#"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              i === 0
                ? "bg-zinc-800/80 text-zinc-50"
                : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
            }`}
          >
            {item}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-xs font-medium text-emerald-300">Sistema operativo</span>
        </div>
        <button className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-zinc-950">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </header>
  );
}
