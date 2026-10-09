'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle,
  XCircle,
  FileText,
  AlertTriangle,
  ArrowRight,
  Info,
} from 'lucide-react';
import { CandidateProfile, WorkflowStep } from '@/types/workflow';

interface ApprovalPanelProps {
  step: WorkflowStep;
  candidates: CandidateProfile[];
  onApprove: (notes: string) => void;
  onReject: (notes: string) => void;
  isExecuting: boolean;
}

export function ApprovalPanel({
  step,
  candidates,
  onApprove,
  onReject,
  isExecuting,
}: ApprovalPanelProps) {
  const [notes, setNotes] = useState(step.approvalNotes || '');

  const selectedCandidates = candidates.filter((c) => c.selectedForAction);
  const isAwaiting = step.status === 'waiting_approval';
  const isApproved = step.status === 'approved' || step.status === 'verified';
  const isRejected = step.status === 'rejected';

  return (
    <div
      className={`rounded-2xl border p-5 shadow-xl transition-all ${
        isAwaiting
          ? 'border-amber-500/40 bg-[#121422] glow-border-indigo'
          : isApproved
          ? 'border-emerald-800/40 bg-[#0c181c]'
          : isRejected
          ? 'border-rose-900/50 bg-[#1a0f14]'
          : 'border-slate-800 bg-[#0d1424]'
      }`}
    >
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${
              isAwaiting
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                : isApproved
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : isRejected
                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                : 'bg-slate-800 text-slate-300'
            }`}
          >
            {isApproved ? (
              <CheckCircle className="h-5 w-5" />
            ) : isRejected ? (
              <XCircle className="h-5 w-5" />
            ) : (
              <ShieldAlert className="h-5 w-5 animate-pulse" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">
                Step 2: Human Review & Approval Gate
              </h3>
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full uppercase ${
                  isAwaiting
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : isApproved
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : isRejected
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {step.status.replace('_', ' ')}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              FlowPilot safety guarantee: downstream actions will not execute without your explicit review and signoff.
            </p>
          </div>
        </div>

        {/* Selected Candidates Pill */}
        <div className="text-xs text-slate-300 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-2">
          <span className="text-slate-400">Selected for Downstream Actions:</span>
          <span className="font-bold text-indigo-400">
            {selectedCandidates.length} candidate{selectedCandidates.length === 1 ? '' : 's'}
          </span>
        </div>
      </div>

      {/* Main Body */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Planned Automated Actions Box */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <Info className="h-3.5 w-3.5 text-cyan-400" />
            <span>Downstream Actions Triggered Upon Approval</span>
          </h4>

          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">•</span>
              <div>
                <span className="font-semibold text-slate-200">
                  Create ATS Task Records:
                </span>{' '}
                {selectedCandidates.map((c) => c.name).join(', ') || 'No candidates selected'}
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">•</span>
              <div>
                <span className="font-semibold text-slate-200">
                  Prepare Email Drafts:
                </span>{' '}
                Personalized interview invites staged in reviewable draft queue.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">•</span>
              <div>
                <span className="font-semibold text-slate-200">
                  Provisional Calendar Holds:
                </span>{' '}
                45-minute slots reserved in local demo calendar memory.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <div>
                <span className="font-semibold text-emerald-300">
                  Integrity Validation:
                </span>{' '}
                System confirms record existence and attaches simulated validation tokens before marking successful.
              </div>
            </li>
          </ul>

          <div className="mt-3 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-center gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0" />
            <span>Demo Safety Note: Actions are simulated locally; no external emails will be sent.</span>
          </div>
        </div>

        {/* Human Feedback & Notes */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-4 flex flex-col justify-between">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-indigo-400" />
              <span>Reviewer Feedback & Audit Notes</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={!isAwaiting || isExecuting}
              placeholder="e.g. Approved. Proceed with Elena Rostova for lead track and Marcus Chen for UI track..."
              rows={3}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-60 transition-all resize-none"
            />
          </div>

          {step.approvalTimestamp && (
            <div className="text-[11px] text-slate-400 font-mono mt-2">
              Signed off at: {step.approvalTimestamp}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {isAwaiting && (
        <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
          <button
            onClick={() => onReject(notes)}
            disabled={isExecuting}
            className="flex items-center gap-2 rounded-xl border border-rose-800/60 bg-rose-950/40 hover:bg-rose-900/60 px-4 py-2.5 text-xs font-semibold text-rose-300 transition-all active:scale-95 disabled:opacity-50"
          >
            <XCircle className="h-4 w-4" />
            <span>Reject Pipeline</span>
          </button>

          <button
            onClick={() => onApprove(notes)}
            disabled={isExecuting || selectedCandidates.length === 0}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-950/50 transition-all active:scale-95"
          >
            {isExecuting ? (
              <>
                <span className="h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>Executing Safe Demo Actions...</span>
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4" />
                <span>Approve & Execute Pipeline</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </div>
      )}

      {isApproved && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-300">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-400" />
            <span>
              Pipeline approved and successfully authorized. Downstream actions and verifications executed.
            </span>
          </div>
          <span className="font-mono text-[11px] text-emerald-400 font-semibold">
            STATUS: AUTHORIZED
          </span>
        </div>
      )}

      {isRejected && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-rose-950/30 border border-rose-800/40 text-xs text-rose-300">
          <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4 text-rose-400" />
            <span>
              Pipeline rejected by human reviewer. Execution halted; no downstream actions executed.
            </span>
          </div>
          <span className="font-mono text-[11px] text-rose-400 font-semibold">
            STATUS: TERMINATED
          </span>
        </div>
      )}
    </div>
  );
}
