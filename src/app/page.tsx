'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Sidebar, NavTab } from '@/components/Sidebar';
import { WorkflowInput } from '@/components/WorkflowInput';
import { WorkflowSteps } from '@/components/WorkflowSteps';
import { CandidateScreeningPanel } from '@/components/CandidateScreeningPanel';
import { ApprovalPanel } from '@/components/ApprovalPanel';
import { ExecutionTimeline } from '@/components/ExecutionTimeline';
import { ResultsSummary } from '@/components/ResultsSummary';
import { DemoRecordsViewer } from '@/components/DemoRecordsViewer';
import {
  generateStructuredWorkflow,
  getInitialWorkflowState,
  generateSimulatedRecordsForApprovedCandidates,
  computeRecordHash,
  createAuditLog,
} from '@/lib/workflowEngine';
import { WorkflowState } from '@/types/workflow';
import { WORKFLOW_PRESETS } from '@/lib/constants';
import { UserCheck, ShieldAlert, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  // Initialize with deterministic baseline matching server-side rendering exactly
  const [workflow, setWorkflow] = useState<WorkflowState>(() =>
    getInitialWorkflowState()
  );

  // Secondary sub-tab on Dashboard: 'screening' vs 'approval'
  const [dashboardSubTab, setDashboardSubTab] = useState<'screening' | 'approval'>('screening');

  // Generate workflow from user prompt
  const handleGenerateWorkflow = async (prompt: string) => {
    setIsGenerating(true);
    try {
      // Attempt API call to server-side route
      const res = await fetch('/api/generate-workflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.workflow) {
          setWorkflow(data.workflow);
          setDashboardSubTab('screening');
          setIsGenerating(false);
          return;
        }
      }
    } catch (err) {
      console.warn('API call fell back to local engine:', err);
    }

    // Fallback directly to client-side engine if server route has issues
    setTimeout(() => {
      const newWf = generateStructuredWorkflow(prompt, false);
      setWorkflow(newWf);
      setDashboardSubTab('screening');
      setIsGenerating(false);
    }, 400);
  };

  // Toggle candidate selection
  const handleToggleCandidate = (id: string) => {
    setWorkflow((prev) => {
      const updatedCandidates = prev.candidates.map((c) =>
        c.id === id ? { ...c, selectedForAction: !c.selectedForAction } : c
      );
      const target = updatedCandidates.find((c) => c.id === id);
      const actionName = target?.selectedForAction
        ? 'Candidate Queued for Action'
        : 'Candidate Removed from Queue';

      return {
        ...prev,
        candidates: updatedCandidates,
        auditLogs: [
          createAuditLog(
            actionName,
            'User',
            'info',
            `${target?.name} was ${target?.selectedForAction ? 'selected' : 'unselected'} by human reviewer.`
          ),
          ...prev.auditLogs,
        ],
      };
    });
  };

  // Human Approval Execution
  const handleApproveWorkflow = (notes: string) => {
    setIsExecuting(true);

    const now = new Date().toLocaleTimeString('en-US', { hour12: false });
    const selected = workflow.candidates.filter((c) => c.selectedForAction);

    // 1. Immediately mark Step 2 as Approved
    setWorkflow((prev) => {
      const updatedSteps = [...prev.steps];
      updatedSteps[1] = {
        ...updatedSteps[1],
        status: 'approved',
        approvalDecision: 'approved',
        approvalNotes: notes || 'Approved without additional notes.',
        approvalTimestamp: now,
      };

      return {
        ...prev,
        status: 'executing',
        activeStepIndex: 2,
        steps: updatedSteps,
        auditLogs: [
          createAuditLog(
            'Human Approval Granted',
            'User',
            'success',
            `Reviewer approved pipeline with ${selected.length} candidates. Notes: "${notes || 'None provided'}". Step 2 cleared.`
          ),
          ...prev.auditLogs,
        ],
      };
    });

    // 2. Sequential execution simulation for Steps 3, 4, 5
    setTimeout(() => {
      // Generate records
      const newRecords = generateSimulatedRecordsForApprovedCandidates(workflow.candidates);

      // Step 3: Tasks created
      setWorkflow((prev) => {
        const updatedSteps = [...prev.steps];
        updatedSteps[2] = { ...updatedSteps[2], status: 'verified' };
        const taskRecords = newRecords.filter((r) => r.type === 'task');

        return {
          ...prev,
          activeStepIndex: 3,
          steps: updatedSteps,
          auditLogs: [
            createAuditLog(
              'ATS Task Records Provisioned',
              'AI Agent',
              'success',
              `Created ${taskRecords.length} internal onboarding/interview tasks in local memory.`,
              { stepId: 'step-3', stepNumber: 3 }
            ),
            ...prev.auditLogs,
          ],
        };
      });

      setTimeout(() => {
        // Step 4: Email Drafts & Calendar Holds created
        setWorkflow((prev) => {
          const updatedSteps = [...prev.steps];
          updatedSteps[3] = { ...updatedSteps[3], status: 'verified' };
          const emailRecords = newRecords.filter((r) => r.type === 'email_draft');
          const calendarRecords = newRecords.filter((r) => r.type === 'calendar_invite');

          return {
            ...prev,
            activeStepIndex: 4,
            steps: updatedSteps,
            auditLogs: [
              createAuditLog(
                'Draft Communications & Schedules Staged',
                'AI Agent',
                'success',
                `Prepared ${emailRecords.length} reviewable email draft${emailRecords.length === 1 ? '' : 's'} and ${calendarRecords.length} provisional calendar hold${calendarRecords.length === 1 ? '' : 's'}.`,
                { stepId: 'step-4', stepNumber: 4 }
              ),
              ...prev.auditLogs,
            ],
          };
        });

        setTimeout(() => {
          // Step 5: Verification check
          const verifiedRecords = newRecords.map((r) => {
            const hash = computeRecordHash(r);
            return {
              ...r,
              verified: true,
              verificationTimestamp: new Date().toISOString(),
              verificationHash: hash,
            };
          });

          setWorkflow((prev) => {
            const updatedSteps = [...prev.steps];
            updatedSteps[0] = { ...updatedSteps[0], status: 'verified' };
            updatedSteps[4] = { ...updatedSteps[4], status: 'verified' };
            const taskCount = verifiedRecords.filter((r) => r.type === 'task').length;
            const emailCount = verifiedRecords.filter((r) => r.type === 'email_draft').length;
            const calCount = verifiedRecords.filter((r) => r.type === 'calendar_invite').length;

            return {
              ...prev,
              status: 'completed',
              activeStepIndex: 4,
              steps: updatedSteps,
              simulatedRecords: verifiedRecords,
              auditLogs: [
                createAuditLog(
                  'Multi-Point Integrity Verified',
                  'System Auditor',
                  'success',
                  `Simulated integrity validation confirmed existence of all ${verifiedRecords.length} records in local memory (${taskCount} ATS tasks, ${emailCount} email drafts, ${calCount} calendar holds). Validation tokens stamped.`,
                  { stepId: 'step-5', stepNumber: 5 }
                ),
                createAuditLog(
                  'Workflow Completed Successfully',
                  'AI Agent',
                  'success',
                  'All 5 sequenced steps completed with 100% human governance.'
                ),
                ...prev.auditLogs,
              ],
            };
          });

          setIsExecuting(false);
        }, 600);
      }, 600);
    }, 600);
  };

  // Human Rejection
  const handleRejectWorkflow = (notes: string) => {
    const now = new Date().toLocaleTimeString('en-US', { hour12: false });
    setWorkflow((prev) => {
      const updatedSteps = prev.steps.map((step, idx) => {
        if (idx === 1) {
          return {
            ...step,
            status: 'rejected' as const,
            approvalDecision: 'rejected' as const,
            approvalNotes: notes || 'Rejected by reviewer.',
            approvalTimestamp: now,
          };
        }
        if (idx > 1) {
          return { ...step, status: 'skipped' as const };
        }
        return step;
      });

      return {
        ...prev,
        status: 'rejected',
        steps: updatedSteps,
        auditLogs: [
          createAuditLog(
            'Human Rejection - Pipeline Terminated',
            'User',
            'warning',
            `Reviewer rejected workflow. Downstream actions aborted. Reason: "${notes || 'No reason provided'}".`
          ),
          ...prev.auditLogs,
        ],
      };
    });
  };

  // Reset demo to baseline state
  const handleResetDemo = () => {
    const fresh = getInitialWorkflowState();
    setWorkflow(fresh);
    setDashboardSubTab('screening');
    setActiveTab('dashboard');
  };

  const pendingApprovalsCount = workflow.steps.filter(
    (s) => s.status === 'waiting_approval'
  ).length;
  const verifiedRecordsCount = workflow.simulatedRecords.filter((r) => r.verified).length;

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans">
      {/* Top App Header */}
      <Header
        pendingApprovals={pendingApprovalsCount}
        verifiedCount={verifiedRecordsCount}
        onReset={handleResetDemo}
        isAiGenerated={workflow.isAiGenerated}
        modelUsed={workflow.modelUsed}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          pendingApprovals={pendingApprovalsCount}
          totalSteps={workflow.steps.length}
          recordsCount={workflow.simulatedRecords.length}
          logsCount={workflow.auditLogs.length}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6 max-w-7xl mx-auto w-full">
          {/* TAB 1: DASHBOARD (Main interactive cockpit) */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Natural Language Prompt Input Box */}
              <WorkflowInput
                onGenerate={handleGenerateWorkflow}
                isGenerating={isGenerating}
                currentPrompt={workflow.prompt}
              />

              {/* Sequenced Pipeline Step Cards */}
              <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-5 shadow-xl">
                <WorkflowSteps
                  steps={workflow.steps}
                  activeStepIndex={workflow.activeStepIndex}
                  onSelectStep={(idx) => {
                    setWorkflow((prev) => ({ ...prev, activeStepIndex: idx }));
                    if (idx === 1) setDashboardSubTab('approval');
                    else setDashboardSubTab('screening');
                  }}
                  workflowStatus={workflow.status}
                />
              </div>

              {/* Sub-tabs for detailed inspection & human control */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDashboardSubTab('screening')}
                      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        dashboardSubTab === 'screening'
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      }`}
                    >
                      <UserCheck className="h-4 w-4" />
                      <span>Candidate Screening & Explainable Evidence</span>
                      <span className="bg-slate-900/60 border border-slate-700/60 px-1.5 py-0.2 rounded text-[10px]">
                        4 Sample Profiles
                      </span>
                    </button>

                    <button
                      onClick={() => setDashboardSubTab('approval')}
                      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        dashboardSubTab === 'approval'
                          ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      }`}
                    >
                      <ShieldAlert className="h-4 w-4" />
                      <span>Step 2: Human Approval Gate</span>
                      {workflow.steps[1].status === 'waiting_approval' && (
                        <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                      )}
                    </button>
                  </div>

                  <span className="text-xs text-slate-500 hidden md:block">
                    Active Pipeline ID: <span className="font-mono text-slate-400">{workflow.id}</span>
                  </span>
                </div>

                {dashboardSubTab === 'screening' ? (
                  <CandidateScreeningPanel
                    candidates={workflow.candidates}
                    requirements={workflow.requirements}
                    onToggleCandidate={handleToggleCandidate}
                    isApprovalPending={workflow.steps[1].status === 'waiting_approval'}
                  />
                ) : (
                  <ApprovalPanel
                    step={workflow.steps[1]}
                    candidates={workflow.candidates}
                    onApprove={handleApproveWorkflow}
                    onReject={handleRejectWorkflow}
                    isExecuting={isExecuting}
                  />
                )}
              </div>

              {/* Results & Statistics */}
              <ResultsSummary
                workflow={workflow}
                onOpenRecords={() => setActiveTab('records')}
              />
            </div>
          )}

          {/* TAB 2: WORKFLOWS */}
          {activeTab === 'workflows' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-5 shadow-xl">
                <WorkflowSteps
                  steps={workflow.steps}
                  activeStepIndex={workflow.activeStepIndex}
                  onSelectStep={(idx) => {
                    setWorkflow((prev) => ({ ...prev, activeStepIndex: idx }));
                  }}
                  workflowStatus={workflow.status}
                />
              </div>

              <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-5 shadow-xl space-y-4">
                <h3 className="text-sm font-semibold text-white">Pipeline Architecture & Dependency Graph</h3>
                <p className="text-xs text-slate-400">
                  Every step is strictly bound to its predecessor. Step 3 (Task Creation) cannot execute without Step 2 sign-off.
                </p>

                <div className="space-y-3">
                  {workflow.steps.map((s) => (
                    <div
                      key={s.id}
                      className="p-3 rounded-xl border border-slate-800 bg-slate-900/60 flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-indigo-400 font-bold">
                            STEP {s.stepNumber}
                          </span>
                          <span className="font-semibold text-white text-xs">{s.title}</span>
                          {s.requiresHumanApproval && (
                            <span className="bg-amber-950/80 border border-amber-800/60 text-amber-300 text-[10px] px-1.5 py-0.2 rounded font-semibold">
                              Human Gate
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{s.description}</p>
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-[11px] text-slate-400">
                          Depends on: {s.dependencies.length > 0 ? s.dependencies.join(', ') : 'None (Root)'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: APPROVALS */}
          {activeTab === 'approvals' && (
            <div className="space-y-6">
              <ApprovalPanel
                step={workflow.steps[1]}
                candidates={workflow.candidates}
                onApprove={handleApproveWorkflow}
                onReject={handleRejectWorkflow}
                isExecuting={isExecuting}
              />

              <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Candidate Evaluation Review
                </h4>
                <CandidateScreeningPanel
                  candidates={workflow.candidates}
                  requirements={workflow.requirements}
                  onToggleCandidate={handleToggleCandidate}
                  isApprovalPending={workflow.steps[1].status === 'waiting_approval'}
                />
              </div>
            </div>
          )}

          {/* TAB 4: DEMO RECORDS */}
          {activeTab === 'records' && (
            <div className="space-y-6">
              <DemoRecordsViewer records={workflow.simulatedRecords} />
            </div>
          )}

          {/* TAB 5: ACTIVITY AUDIT */}
          {activeTab === 'activity' && (
            <div className="space-y-6">
              <ExecutionTimeline logs={workflow.auditLogs} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
