import React from "react";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <div>
        <div className="text-xs text-zinc-400">MONNAVI</div>
        <div className="text-2xl font-semibold">SMART IRRIGATION</div>
        <div className="text-xs text-zinc-500">AI-powered irrigation intelligence</div>
      </div>
      <nav className="flex items-center gap-4 text-sm text-zinc-300">
        <a className="hover:text-zinc-50">Resumen</a>
        <a className="hover:text-zinc-50">Campo</a>
        <a className="hover:text-zinc-50">Analítica</a>
        <a className="hover:text-zinc-50">AI Insights</a>
        <a className="hover:text-zinc-50">Riego</a>
      </nav>
    </header>
  );
}
