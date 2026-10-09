'use client';

import React from 'react';
import {
  CandidateProfile,
  JobRequirement,
} from '@/types/workflow';
import {
  UserCheck,
  Award,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Briefcase,
  GraduationCap,
  Scale,
} from 'lucide-react';

interface CandidateScreeningPanelProps {
  candidates: CandidateProfile[];
  requirements: JobRequirement[];
  onToggleCandidate: (id: string) => void;
  isApprovalPending: boolean;
}

export function CandidateScreeningPanel({
  candidates,
  requirements,
  onToggleCandidate,
  isApprovalPending,
}: CandidateScreeningPanelProps) {
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40';
    if (score >= 70) return 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40';
    if (score >= 50) return 'text-amber-400 border-amber-500/30 bg-amber-950/40';
    return 'text-rose-400 border-rose-500/30 bg-rose-950/40';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'strong_match':
        return (
          <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
            Strong Match
          </span>
        );
      case 'potential_match':
        return (
          <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-xs font-semibold text-amber-400">
            Potential Match
          </span>
        );
      default:
        return (
          <span className="rounded-full bg-rose-500/10 border border-rose-500/20 px-2.5 py-0.5 text-xs font-semibold text-rose-400">
            Unqualified
          </span>
        );
    }
  };

  return (
    <div className="space-y-5">
      {/* Criteria Breakdown Banner */}
      <div className="rounded-xl border border-slate-800 bg-[#0c1220] p-4">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Scale className="h-4 w-4 text-indigo-400" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Target Evaluation Criteria (Senior Frontend Engineer)
            </h4>
          </div>
          <span className="text-xs text-slate-400">
            Deterministic weighted matching algorithm
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {requirements.map((req) => (
            <div
              key={req.id}
              className="flex items-center justify-between rounded-lg border border-slate-800/80 bg-slate-900/60 px-3 py-2 text-xs"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    req.category === 'Mandatory' ? 'bg-indigo-400' : 'bg-cyan-400'
                  }`}
                />
                <span className="text-slate-300">{req.label}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">
                {req.weight}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Candidate Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-white flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-indigo-400" />
            <span>Applicant Screening Results & Explainable AI Evidence</span>
          </h4>
          <span className="text-xs text-slate-400">
            Checkboxes control which candidates are queued for automated interview loops
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {candidates.map((candidate) => {
            return (
              <div
                key={candidate.id}
                className={`relative rounded-2xl border p-4.5 transition-all flex flex-col justify-between ${
                  candidate.selectedForAction
                    ? 'border-indigo-500/60 bg-[#0f172a] shadow-lg shadow-indigo-950/50'
                    : 'border-slate-800 bg-[#0c1220]/80 opacity-80'
                }`}
              >
                <div>
                  {/* Candidate Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 text-sm font-bold text-slate-200 border border-slate-700">
                        {candidate.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-sm font-bold text-white">{candidate.name}</h5>
                          {getStatusBadge(candidate.matchStatus)}
                        </div>
                        <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                          <span>{candidate.role}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3 text-slate-500" />
                            {candidate.experienceYears} yrs exp
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Match Score Badge */}
                    <div
                      className={`flex flex-col items-center justify-center rounded-xl border px-3 py-1.5 font-bold ${getScoreColor(
                        candidate.matchScore
                      )}`}
                    >
                      <span className="text-base font-extrabold">{candidate.matchScore}%</span>
                      <span className="text-[10px] font-normal tracking-wide uppercase opacity-80">
                        Match
                      </span>
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {candidate.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-slate-800/80 px-2 py-0.5 text-[11px] font-medium text-slate-300 border border-slate-700/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Criteria Checklist Breakdown */}
                  <div className="mb-3 space-y-1 rounded-xl bg-slate-900/80 p-2.5 border border-slate-800/60 text-xs">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                      <span>Requirement Checklist</span>
                      <span>
                        {candidate.matchedRequirements.length} / {requirements.length} Passed
                      </span>
                    </div>

                    {candidate.matchedRequirements.map((req) => (
                      <div key={req} className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
                        <CheckCircle2 className="h-3 w-3 flex-shrink-0" />
                        <span>{req}</span>
                      </div>
                    ))}

                    {candidate.missingRequirements.map((req) => (
                      <div key={req} className="flex items-center gap-1.5 text-rose-400/90 text-[11px]">
                        <AlertCircle className="h-3 w-3 flex-shrink-0" />
                        <span>Missing: {req}</span>
                      </div>
                    ))}
                  </div>

                  {/* Evidence Summary Box */}
                  <div className="mb-2.5 rounded-xl border border-indigo-950 bg-indigo-950/20 p-2.5 text-xs">
                    <div className="flex items-center gap-1.5 font-semibold text-indigo-300 text-[11px] mb-1">
                      <Sparkles className="h-3 w-3" />
                      <span>Explainable AI Evidence</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {candidate.evidenceSummary}
                    </p>
                  </div>

                  {/* AI Recommendation */}
                  <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-2 text-xs">
                    <span className="font-semibold text-slate-400 text-[11px] block mb-0.5">
                      Recommendation:
                    </span>
                    <p className="text-[11px] text-slate-300">{candidate.aiRecommendation}</p>
                  </div>
                </div>

                {/* Bottom Selection Bar */}
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={candidate.selectedForAction}
                      onChange={() => onToggleCandidate(candidate.id)}
                      disabled={!isApprovalPending}
                      className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0 disabled:opacity-50"
                    />
                    <span className="text-xs font-medium text-slate-200">
                      Include in Automated Interview Loop
                    </span>
                  </label>

                  <span className="text-[10px] text-slate-500 font-mono">
                    ID: {candidate.id.toUpperCase()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
