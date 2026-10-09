'use client';

import React, { useState } from 'react';
import { SimulatedArtifact } from '@/types/workflow';
import {
  Database,
  FileCheck2,
  Mail,
  Calendar,
  ShieldCheck,
  Code2,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
} from 'lucide-react';

interface DemoRecordsViewerProps {
  records: SimulatedArtifact[];
  onClose?: () => void;
}

export function DemoRecordsViewer({ records }: DemoRecordsViewerProps) {
  const [selectedRecordId, setSelectedRecordId] = useState<string>(
    records[0]?.id || ''
  );
  const [viewMode, setViewMode] = useState<'preview' | 'json'>('preview');
  const [copied, setCopied] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');

  const filteredRecords = records.filter((r) => {
    if (filterType === 'all') return true;
    return r.type === filterType;
  });

  const activeRecord =
    records.find((r) => r.id === selectedRecordId) || filteredRecords[0] || records[0];

  const handleCopyJson = (data: unknown) => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getRecordIcon = (type: string) => {
    switch (type) {
      case 'task':
        return <FileCheck2 className="h-4 w-4 text-cyan-400" />;
      case 'email_draft':
        return <Mail className="h-4 w-4 text-indigo-400" />;
      case 'calendar_invite':
        return <Calendar className="h-4 w-4 text-amber-400" />;
      default:
        return <Database className="h-4 w-4 text-slate-400" />;
    }
  };

  if (records.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-8 text-center">
        <Database className="mx-auto h-10 w-10 text-slate-600 mb-3" />
        <h3 className="text-base font-bold text-white mb-1">No Demo Records Generated Yet</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Run the workflow and click &quot;Approve &amp; Execute Pipeline&quot; on Step 2 to generate simulated task records, email drafts, and calendar holds.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-5 shadow-xl">
      {/* Disclaimer Banner */}
      <div className="mb-4 flex items-center justify-between rounded-xl border border-indigo-900/40 bg-indigo-950/20 px-3.5 py-2.5 text-xs text-indigo-300">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-400 flex-shrink-0" />
          <span>
            <strong>Simulated Demo Storage:</strong> All records below exist in local demo state with simulated integrity validation. No real emails or calendars are contacted.
          </span>
        </div>
        <span className="font-mono text-[11px] text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
          {records.filter((r) => r.verified).length} / {records.length} Verified
        </span>
      </div>

      {/* Main split view */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Record List */}
        <div className="lg:col-span-5 space-y-3">
          {/* Filter tabs */}
          <div className="flex gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
            {(['all', 'task', 'email_draft', 'calendar_invite'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`flex-1 py-1 px-2 rounded-md font-medium text-[11px] capitalize transition-all ${
                  filterType === t
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t === 'all' ? 'All' : t.replace('_', ' ')}
              </button>
            ))}
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {filteredRecords.map((rec) => {
              const isSelected = activeRecord?.id === rec.id;
              return (
                <div
                  key={rec.id}
                  onClick={() => setSelectedRecordId(rec.id)}
                  className={`cursor-pointer rounded-xl border p-3 transition-all ${
                    isSelected
                      ? 'border-indigo-500 bg-slate-900 shadow-md ring-1 ring-indigo-500/50'
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-white">
                      {getRecordIcon(rec.type)}
                      <span>{rec.id}</span>
                    </div>

                    {rec.verified && (
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/40 px-1.5 py-0.2 rounded">
                        <CheckCircle2 className="h-2.5 w-2.5" />
                        Verified
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-semibold text-slate-200 line-clamp-1">
                    {rec.title}
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                    {rec.summary}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono mt-1">
                    Owner: {rec.recipientOrOwner}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Record Inspector */}
        <div className="lg:col-span-7">
          {activeRecord ? (
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 flex flex-col justify-between h-full">
              <div>
                {/* Header of Inspector */}
                <div className="flex items-start justify-between gap-3 mb-3 pb-3 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-950/60 border border-indigo-800/50 px-2 py-0.5 rounded">
                        {activeRecord.id}
                      </span>
                      <span className="text-xs font-semibold uppercase text-slate-400">
                        {activeRecord.type.replace('_', ' ')}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mt-1.5">
                      {activeRecord.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                    <button
                      onClick={() => setViewMode('preview')}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-all ${
                        viewMode === 'preview'
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Eye className="h-3 w-3" />
                      <span>Preview</span>
                    </button>
                    <button
                      onClick={() => setViewMode('json')}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-all ${
                        viewMode === 'json'
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Code2 className="h-3 w-3" />
                      <span>Payload JSON</span>
                    </button>
                  </div>
                </div>

                {/* Body Content */}
                {viewMode === 'preview' ? (
                  <div className="space-y-3">
                    <div className="rounded-lg bg-slate-950 p-3 border border-slate-800 text-xs space-y-2">
                      <div className="flex justify-between text-slate-400 text-[11px] pb-1 border-b border-slate-800/60">
                        <span>Target Entity:</span>
                        <span className="font-mono text-slate-200">
                          {activeRecord.recipientOrOwner}
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-400 text-[11px] pb-1 border-b border-slate-800/60">
                        <span>Creation Timestamp:</span>
                        <span className="font-mono text-slate-200">
                          {activeRecord.createdAt}
                        </span>
                      </div>

                      {activeRecord.type === 'email_draft' && (
                        <div className="pt-1">
                          <div className="font-semibold text-slate-300 mb-1">
                            Subject: {String(activeRecord.payload.subject || '')}
                          </div>
                          <div className="whitespace-pre-wrap font-sans text-xs bg-slate-900/80 p-2.5 rounded border border-slate-800 text-slate-200 leading-relaxed">
                            {String(activeRecord.payload.body || '')}
                          </div>
                        </div>
                      )}

                      {activeRecord.type === 'task' && (
                        <div className="pt-1 space-y-1.5">
                          <div className="text-slate-300">
                            <strong>Candidate:</strong> {String(activeRecord.payload.candidateName || '')}
                          </div>
                          <div className="text-slate-300">
                            <strong>Role:</strong> {String(activeRecord.payload.role || '')}
                          </div>
                          <div className="text-slate-300">
                            <strong>Interviewers:</strong>{' '}
                            {String(activeRecord.payload.interviewer1 || '')} &amp;{' '}
                            {String(activeRecord.payload.interviewer2 || '')}
                          </div>
                        </div>
                      )}

                      {activeRecord.type === 'calendar_invite' && (
                        <div className="pt-1 space-y-1.5">
                          <div className="text-slate-300">
                            <strong>Event Title:</strong> {String(activeRecord.payload.event || '')}
                          </div>
                          <div className="text-slate-300">
                            <strong>Tentative Slot:</strong>{' '}
                            {String(activeRecord.payload.tentativeDate || '')}
                          </div>
                          <div className="text-slate-300">
                            <strong>Virtual Room:</strong> {String(activeRecord.payload.room || '')}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <pre className="rounded-lg bg-slate-950 p-3 border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto max-h-[300px]">
                      {JSON.stringify(activeRecord, null, 2)}
                    </pre>
                    <button
                      onClick={() => handleCopyJson(activeRecord)}
                      className="absolute top-2 right-2 flex items-center gap-1 rounded bg-slate-800 px-2 py-1 text-[10px] text-slate-300 hover:bg-slate-700"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Verification Audit Stamp */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Validation Token: {activeRecord.verificationHash || 'SIM-TOKEN-VERIFIED'}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">
                  Simulated Local Demo Storage
                </span>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-500">
              Select a record to inspect details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
