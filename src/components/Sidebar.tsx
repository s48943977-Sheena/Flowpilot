'use client';

import React from 'react';
import {
  LayoutDashboard,
  GitBranch,
  CheckSquare,
  Activity,
  Database,
  Layers,
  Info,
  ExternalLink,
} from 'lucide-react';

export type NavTab = 'dashboard' | 'workflows' | 'approvals' | 'activity' | 'records';

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  pendingApprovals: number;
  totalSteps: number;
  recordsCount: number;
  logsCount: number;
}

export function Sidebar({
  activeTab,
  onTabChange,
  pendingApprovals,
  totalSteps,
  recordsCount,
  logsCount,
}: SidebarProps) {
  const navItems = [
    {
      id: 'dashboard' as NavTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'workflows' as NavTab,
      label: 'Workflows',
      icon: GitBranch,
      badge: `${totalSteps} steps`,
    },
    {
      id: 'approvals' as NavTab,
      label: 'Approvals',
      icon: CheckSquare,
      badge: pendingApprovals > 0 ? `${pendingApprovals}` : null,
      badgeColor: pendingApprovals > 0 ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : undefined,
    },
    {
      id: 'records' as NavTab,
      label: 'Demo Records',
      icon: Database,
      badge: recordsCount > 0 ? `${recordsCount}` : null,
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    },
    {
      id: 'activity' as NavTab,
      label: 'Activity Audit',
      icon: Activity,
      badge: logsCount > 0 ? `${logsCount}` : null,
    },
  ];

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-800/80 bg-[#0b101d] flex flex-col justify-between p-4 min-h-[calc(100vh-61px)]">
      <div>
        {/* Navigation Section */}
        <div className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Navigation
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${
                      isActive
                        ? 'border-indigo-400/40 bg-indigo-700/60 text-white'
                        : item.badgeColor || 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Hackathon Concept Box */}
        <div className="mt-8 rounded-xl border border-slate-800/80 bg-slate-900/50 p-3.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
            <Layers className="h-4 w-4" />
            <span>HackNowa 2026 Focus</span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            FlowPilot bridges autonomous AI and human oversight. Autonomous agents propose steps, but high-impact decisions always enforce explicit human approval before safe local execution.
          </p>
        </div>
      </div>

      {/* Safety & Environment Notice */}
      <div className="rounded-xl border border-slate-800/60 bg-[#090d16] p-3 text-xs text-slate-400">
        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
          <span>ENVIRONMENT</span>
          <span className="text-emerald-400 font-mono">100% Offline Ready</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-normal">
          Running safe local demo on Windows. All task, email, and calendar outputs are isolated mock records.
        </p>
      </div>
    </aside>
  );
}
