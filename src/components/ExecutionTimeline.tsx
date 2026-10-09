'use client';

import React, { useState } from 'react';
import {
  AuditLogEntry,
} from '@/types/workflow';
import {
  Activity,
  User,
  Bot,
  ShieldCheck,
  CheckCircle2,
  Info,
  AlertTriangle,
  XCircle,
  Filter,
} from 'lucide-react';

interface ExecutionTimelineProps {
  logs: AuditLogEntry[];
}

export function ExecutionTimeline({ logs }: ExecutionTimelineProps) {
  const [actorFilter, setActorFilter] = useState<'All' | 'User' | 'AI Agent' | 'System Auditor'>('All');

  const filteredLogs = logs.filter((log) => {
    if (actorFilter === 'All') return true;
    return log.actor === actorFilter;
  });

  const getActorIcon = (actor: string) => {
    switch (actor) {
      case 'User':
        return <User className="h-3.5 w-3.5 text-amber-400" />;
      case 'AI Agent':
        return <Bot className="h-3.5 w-3.5 text-cyan-400" />;
      case 'System Auditor':
        return <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />;
      default:
        return <Activity className="h-3.5 w-3.5 text-slate-400" />;
    }
  };

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-400" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-rose-400" />;
      default:
        return <Info className="h-4 w-4 text-indigo-400" />;
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-5 shadow-xl">
      {/* Header and Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Activity className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Execution Audit Trail & Activity Timeline</h3>
            <p className="text-xs text-slate-400">
              Deterministic, real-time logging of agent generation, human reviews, and record verifications.
            </p>
          </div>
        </div>

        {/* Actor Filter Chips */}
        <div className="flex items-center gap-1.5 text-xs">
          <Filter className="h-3.5 w-3.5 text-slate-500 mr-1" />
          {(['All', 'AI Agent', 'User', 'System Auditor'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActorFilter(filter)}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                actorFilter === filter
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline List */}
      <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
        {filteredLogs.length === 0 ? (
          <div className="py-6 text-center text-xs text-slate-500">
            No audit records matching selected filter.
          </div>
        ) : (
          filteredLogs.map((log) => {
            return (
              <div key={log.id} className="relative group">
                {/* Timeline node */}
                <span className="absolute -left-6 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-slate-950 ring-4 ring-slate-900">
                  <span className="h-2 w-2 rounded-full bg-indigo-500" />
                </span>

                <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5 transition-all hover:border-slate-700 hover:bg-slate-900/90">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(log.type)}
                      <span className="text-xs font-bold text-white">{log.action}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700/60">
                        {getActorIcon(log.actor)}
                        <span>{log.actor}</span>
                      </span>

                      <span className="text-[11px] font-mono text-slate-500">
                        {log.timestamp}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{log.details}</p>

                  {log.recordId && (
                    <div className="mt-2 flex items-center gap-2 text-[11px] font-mono text-indigo-400">
                      <span>Artifact Ref:</span>
                      <span className="bg-indigo-950/80 border border-indigo-800/50 px-1.5 py-0.5 rounded">
                        {log.recordId}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
