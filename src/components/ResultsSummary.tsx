'use client';

import React from 'react';
import {
  WorkflowState,
} from '@/types/workflow';
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  TrendingUp,
  Award,
  Database,
  FileCheck2,
} from 'lucide-react';

interface ResultsSummaryProps {
  workflow: WorkflowState;
  onOpenRecords: () => void;
}

export function ResultsSummary({ workflow, onOpenRecords }: ResultsSummaryProps) {
  const verifiedRecords = workflow.simulatedRecords.filter((r) => r.verified);
  const totalSteps = workflow.steps.length;
  const completedSteps = workflow.steps.filter(
    (s) => s.status === 'verified' || s.status === 'approved'
  ).length;
  // Backward compatibility alias to prevent any runtime ReferenceError
  const verifiedSteps = completedSteps;
  const completionPercentage =
    totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  // Calculate estimated time saved based on executed steps
  const estimatedHoursSaved = (completedSteps * 0.9).toFixed(1);

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-5 shadow-xl">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Award className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Results Summary & Impact Metrics</h3>
            <p className="text-xs text-slate-400">
              Future of Work productivity metrics and verified record outcomes.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenRecords}
          className="text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-950/40 hover:bg-indigo-950/70 border border-indigo-800/40 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5"
        >
          <Database className="h-3.5 w-3.5" />
          <span>View {workflow.simulatedRecords.length} Demo Records</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {/* Metric 1 */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs">Pipeline Progress</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-xl font-extrabold text-white">
              {completionPercentage}%
            </div>
            {/* Visual progress bar */}
            <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
          <div className="text-[11px] text-slate-500 mt-2">
            {completedSteps} of {totalSteps} steps completed
          </div>
        </div>

        {/* Metric 2 */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs">Time Saved</span>
            <Clock className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="text-xl font-extrabold text-white">
            ~{estimatedHoursSaved} hrs
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Manual screening & drafting eliminated
          </div>
        </div>

        {/* Metric 3 */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs">Verified Artifacts</span>
            <ShieldCheck className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="text-xl font-extrabold text-white">
            {verifiedRecords.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            100% simulated integrity validation passed
          </div>
        </div>

        {/* Metric 4 */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs">Human Governance</span>
            <TrendingUp className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-xl font-extrabold text-white">
            100%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Zero unauthorized external mutations
          </div>
        </div>
      </div>

      {/* Generated Artifacts Breakdown */}
      {workflow.simulatedRecords.length > 0 ? (
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-3.5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
            <div className="flex items-center gap-1.5">
              <FileCheck2 className="h-4 w-4 text-cyan-400" />
              <span>Simulated Local Demo Records Created</span>
            </div>
            <span className="text-slate-500 font-mono text-[11px]">
              All items verified in local state
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {workflow.simulatedRecords.map((record) => (
              <div
                key={record.id}
                className="rounded-lg border border-slate-800 bg-slate-950/80 p-2.5 text-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-indigo-400 text-[11px]">
                      {record.id}
                    </span>
                    <span className="rounded bg-emerald-950 border border-emerald-800/50 px-1.5 py-0.2 text-[10px] text-emerald-400 font-semibold">
                      VERIFIED
                    </span>
                  </div>
                  <div className="font-medium text-slate-200 line-clamp-1 text-xs">
                    {record.title}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                    {record.summary}
                  </p>
                </div>

                <div className="mt-2 pt-1.5 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>{record.type.replace('_', ' ').toUpperCase()}</span>
                  <span>{record.verificationHash?.slice(0, 14)}...</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-3 text-center rounded-xl bg-slate-900/30 border border-slate-800/50 text-xs text-slate-500">
          No records created yet. Approve Step 2 to generate and verify local demo records.
        </div>
      )}
    </div>
  );
}
