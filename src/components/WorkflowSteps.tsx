'use client';

import React from 'react';
import {
  WorkflowStep,
  StepStatus,
  StepType,
} from '@/types/workflow';
import {
  Search,
  UserCheck,
  FileCheck2,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  PlayCircle,
  ArrowRight,
} from 'lucide-react';

interface WorkflowStepsProps {
  steps: WorkflowStep[];
  activeStepIndex: number;
  onSelectStep: (index: number) => void;
  workflowStatus: string;
}

export function WorkflowSteps({
  steps,
  activeStepIndex,
  onSelectStep,
  workflowStatus,
}: WorkflowStepsProps) {
  const getStepIcon = (type: StepType) => {
    switch (type) {
      case 'analysis':
        return Search;
      case 'approval':
        return UserCheck;
      case 'action_task':
        return FileCheck2;
      case 'action_email':
        return Mail;
      case 'verification':
        return ShieldCheck;
      default:
        return PlayCircle;
    }
  };

  const getStatusBadge = (status: StepStatus, requiresHuman: boolean) => {
    switch (status) {
      case 'verified':
        return (
          <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
            <CheckCircle2 className="h-3 w-3" />
            Verified
          </span>
        );
      case 'approved':
        return (
          <span className="flex items-center gap-1 text-[11px] font-semibold text-indigo-300 bg-indigo-950/60 border border-indigo-800/40 px-2 py-0.5 rounded-full">
            <CheckCircle2 className="h-3 w-3" />
            Approved
          </span>
        );
      case 'waiting_approval':
        return (
          <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-300 bg-amber-950/60 border border-amber-700/50 px-2 py-0.5 rounded-full animate-pulse">
            <AlertTriangle className="h-3 w-3 text-amber-400" />
            Awaiting Approval
          </span>
        );
      case 'executing':
      case 'in_progress':
        return (
          <span className="flex items-center gap-1 text-[11px] font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded-full">
            <Clock className="h-3 w-3 animate-spin" />
            Executing
          </span>
        );
      case 'rejected':
        return (
          <span className="flex items-center gap-1 text-[11px] font-semibold text-rose-300 bg-rose-950/60 border border-rose-800/40 px-2 py-0.5 rounded-full">
            <XCircle className="h-3 w-3" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-slate-800/60 border border-slate-700/40 px-2 py-0.5 rounded-full">
            {requiresHuman ? 'Pending Review' : 'Queued'}
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Header & Sub-bar */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <span>Workflow Execution Pipeline</span>
            <span className="text-xs font-normal text-slate-400">
              ({steps.length} Sequenced Steps)
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Step 2 enforces human approval before creating records in Steps 3–5.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md">
          Status: <span className="text-indigo-400 font-semibold uppercase">{workflowStatus}</span>
        </div>
      </div>

      {/* Steps List / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {steps.map((step, idx) => {
          const Icon = getStepIcon(step.type);
          const isSelected = activeStepIndex === idx;
          const isVerified = step.status === 'verified';
          const isApproved = step.status === 'approved';
          const isAwaiting = step.status === 'waiting_approval';
          const isRejected = step.status === 'rejected';

          return (
            <div
              key={step.id}
              onClick={() => onSelectStep(idx)}
              className={`relative cursor-pointer rounded-xl p-3.5 border transition-all flex flex-col justify-between ${
                isSelected
                  ? isVerified
                    ? 'border-emerald-600 bg-slate-900/90 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/50'
                    : isApproved
                    ? 'border-indigo-500 bg-slate-900/90 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/50'
                    : 'border-indigo-500 bg-slate-900/90 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/50'
                  : isVerified
                  ? 'border-emerald-900/50 bg-slate-900/40 hover:border-emerald-700/50'
                  : isApproved
                  ? 'border-indigo-800/60 bg-indigo-950/20 hover:border-indigo-700/60'
                  : isAwaiting
                  ? 'border-amber-700/60 bg-amber-950/20 hover:border-amber-600/70'
                  : isRejected
                  ? 'border-rose-900/60 bg-rose-950/20'
                  : 'border-slate-800 bg-slate-900/30 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Step Top: Number and Badge */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold ${
                        isVerified
                          ? 'bg-emerald-500 text-slate-950'
                          : isApproved
                          ? 'bg-indigo-500 text-white'
                          : isAwaiting
                          ? 'bg-amber-400 text-slate-950 animate-bounce'
                          : isRejected
                          ? 'bg-rose-500 text-white'
                          : isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {step.stepNumber}
                    </span>
                    <Icon
                      className={`h-4 w-4 ${
                        isVerified
                          ? 'text-emerald-400'
                          : isApproved
                          ? 'text-indigo-400'
                          : isAwaiting
                          ? 'text-amber-400'
                          : 'text-indigo-400'
                      }`}
                    />
                  </div>

                  {step.requiresHumanApproval && (
                    <span className="text-[10px] font-semibold text-amber-400 bg-amber-950/80 border border-amber-800/60 px-1.5 py-0.5 rounded">
                      Human Gate
                    </span>
                  )}
                </div>

                {/* Title */}
                <h4 className="text-xs font-semibold text-white line-clamp-1 mb-1">
                  {step.title}
                </h4>

                {/* Description */}
                <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                  {step.description}
                </p>
              </div>

              {/* Step Footer: Status & Dependencies */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/70 flex items-center justify-between">
                <div>{getStatusBadge(step.status, step.requiresHumanApproval)}</div>

                {idx < steps.length - 1 && (
                  <ArrowRight className="hidden md:block h-3.5 w-3.5 text-slate-600" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
