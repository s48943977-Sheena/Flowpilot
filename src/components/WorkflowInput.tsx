'use client';

import React, { useState } from 'react';
import { Send, Sparkles, Wand2, Compass, AlertCircle } from 'lucide-react';
import { WORKFLOW_PRESETS } from '@/lib/constants';
import { WorkflowPreset } from '@/types/workflow';

interface WorkflowInputProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
  currentPrompt: string;
}

export function WorkflowInput({
  onGenerate,
  isGenerating,
  currentPrompt,
}: WorkflowInputProps) {
  const [prompt, setPrompt] = useState(currentPrompt);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError('Please enter a work request or select one of the presets below.');
      return;
    }
    setError(null);
    onGenerate(prompt.trim());
  };

  const handleSelectPreset = (preset: WorkflowPreset) => {
    setPrompt(preset.prompt);
    setError(null);
    onGenerate(preset.prompt);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-5 shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Wand2 className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Enter Natural-Language Work Request</h2>
            <p className="text-xs text-slate-400">
              Describe what work needs to be completed. FlowPilot will structure the plan, assess criteria, and ask for your approval.
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-indigo-400 bg-indigo-950/40 border border-indigo-800/40 px-2.5 py-1 rounded-full">
          <Compass className="h-3.5 w-3.5" />
          <span>Interactive Hackathon Demo</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
              if (error) setError(null);
            }}
            placeholder="e.g. Screen candidate profiles for our Senior Frontend Engineer role against React and TypeScript requirements, require my review, and prepare interview drafts..."
            rows={3}
            className="w-full rounded-xl border border-slate-700/80 bg-slate-900/90 p-3.5 text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all resize-none shadow-inner"
          />

          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            {prompt && (
              <button
                type="button"
                onClick={() => setPrompt('')}
                className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1 rounded"
              >
                Clear
              </button>
            )}
            <button
              type="submit"
              disabled={isGenerating || !prompt.trim()}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 transition-all active:scale-95"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="h-3.5 w-3.5 animate-spin text-indigo-300" />
                  <span>Synthesizing Workflow...</span>
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  <span>Generate Workflow</span>
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-950/30 border border-rose-900/40 p-2 rounded-lg">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Quick Presets */}
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2 font-medium">
            <span>QUICK-START PRESETS (CLICK TO GENERATE):</span>
            <span className="text-slate-500">HackNowa Scenarios</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {WORKFLOW_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className="group text-left p-2.5 rounded-xl border border-slate-800 hover:border-indigo-500/50 bg-slate-900/60 hover:bg-slate-900 transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-semibold text-indigo-400 bg-indigo-950/60 px-1.5 py-0.5 rounded border border-indigo-900/40">
                    {preset.category}
                  </span>
                  <span className="text-[10px] text-slate-500 group-hover:text-indigo-400 transition-colors">
                    {preset.badge}
                  </span>
                </div>
                <div className="text-xs font-medium text-slate-200 group-hover:text-white transition-colors">
                  {preset.title}
                </div>
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
