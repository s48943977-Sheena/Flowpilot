'use client';

import React from 'react';
import { Sparkles, RotateCcw, ShieldCheck, Cpu, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  pendingApprovals: number;
  verifiedCount: number;
  onReset: () => void;
  isAiGenerated: boolean;
  modelUsed?: string;
}

export function Header({
  pendingApprovals,
  verifiedCount,
  onReset,
  isAiGenerated,
  modelUsed,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-[#090d16]/90 backdrop-blur-md px-6 py-3.5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 text-white shadow-lg shadow-indigo-500/25">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white">FlowPilot</h1>
              <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-400 border border-indigo-500/20">
                HackNowa 2026
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Future of Work & Automation • Human-in-the-Loop Orchestrator
            </p>
          </div>
        </div>

        {/* Engine Status & Badges */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <div className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-slate-300">
            <Cpu className="h-3.5 w-3.5 text-cyan-400" />
            <span className="text-slate-400">Engine:</span>
            <span className="font-medium text-cyan-300">
              {modelUsed || (isAiGenerated ? 'Gemini 1.5' : 'Deterministic Offline Engine')}
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-lg border border-emerald-900/50 bg-emerald-950/30 px-3 py-1.5 text-emerald-300">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Safe Demo Sandbox</span>
          </div>

          {/* Quick Metrics */}
          {pendingApprovals > 0 ? (
            <div className="flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-amber-300">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span>{pendingApprovals} Pending Approval</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-1.5 text-slate-400">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>{verifiedCount} Verified Records</span>
            </div>
          )}

          {/* Reset Demo Button */}
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 hover:border-slate-600 bg-slate-800/80 hover:bg-slate-800 px-3 py-1.5 text-slate-200 transition-all active:scale-95"
            title="Reset demo back to initial state"
          >
            <RotateCcw className="h-3.5 w-3.5 text-slate-400" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>
    </header>
  );
}
