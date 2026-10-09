import {
  AuditLogEntry,
  CandidateProfile,
  SimulatedArtifact,
  WorkflowState,
  WorkflowStep,
} from '@/types/workflow';
import { DEFAULT_JOB_REQUIREMENTS, INITIAL_CANDIDATES } from './constants';

export function createAuditLog(
  action: string,
  actor: 'User' | 'AI Agent' | 'System Auditor',
  type: 'info' | 'success' | 'warning' | 'error',
  details: string,
  extra?: { stepId?: string; stepNumber?: number; recordId?: string }
): AuditLogEntry {
  return {
    id: `LOG-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`.toUpperCase(),
    timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    action,
    actor,
    type,
    details,
    stepId: extra?.stepId,
    stepNumber: extra?.stepNumber,
    recordId: extra?.recordId,
  };
}

export function generateStructuredWorkflow(prompt: string, isAi = false): WorkflowState {
  const lower = prompt.toLowerCase();
  const isCandidateScreening =
    lower.includes('screen') ||
    lower.includes('candidate') ||
    lower.includes('hire') ||
    lower.includes('applicant') ||
    lower.includes('resume') ||
    lower.includes('frontend') ||
    lower.includes('engineer');

  const isIncident =
    lower.includes('incident') ||
    lower.includes('ticket') ||
    lower.includes('p1') ||
    lower.includes('outage') ||
    lower.includes('sre');

  let title = 'Automated Workflow Pipeline';
  let steps: WorkflowStep[] = [];

  if (isCandidateScreening) {
    title = 'Candidate Screening & Interview Staging Pipeline';
    steps = [
      {
        id: 'step-1',
        stepNumber: 1,
        title: 'Profile Analysis & Criteria Scoring',
        description: 'Scan applicant profiles against mandatory React, TypeScript, and 3+ yr requirements. Generate match score and evidence breakdown.',
        type: 'analysis',
        status: 'pending',
        dependencies: [],
        requiresHumanApproval: false,
      },
      {
        id: 'step-2',
        stepNumber: 2,
        title: 'Human Review & Shortlist Sign-Off',
        description: 'Hiring manager reviews candidates exceeding match threshold. Requires explicit manual signoff before any action execution.',
        type: 'approval',
        status: 'waiting_approval',
        dependencies: ['step-1'],
        requiresHumanApproval: true,
      },
      {
        id: 'step-3',
        stepNumber: 3,
        title: 'Create Local ATS Task Records',
        description: 'Provision internal candidate tracking records and evaluation rubrics in the local system.',
        type: 'action_task',
        status: 'pending',
        dependencies: ['step-2'],
        requiresHumanApproval: false,
      },
      {
        id: 'step-4',
        stepNumber: 4,
        title: 'Prepare Email Drafts & Calendar Holds',
        description: 'Generate reviewable interview invitation drafts and provisional calendar holds for approved candidates.',
        type: 'action_email',
        status: 'pending',
        dependencies: ['step-3'],
        requiresHumanApproval: false,
      },
      {
        id: 'step-5',
        stepNumber: 5,
        title: 'Execution Verification & Integrity Audit',
        description: 'Perform simulated integrity validation and existence checks on all generated local demo records before finalizing workflow.',
        type: 'verification',
        status: 'pending',
        dependencies: ['step-4'],
        requiresHumanApproval: false,
      },
    ];
  } else if (isIncident) {
    title = 'Critical Incident Triage & Post-Mortem Workflow';
    steps = [
      {
        id: 'step-1',
        stepNumber: 1,
        title: 'Incident Telemetry & Impact Assessment',
        description: 'Aggregate service health metrics, error rate spikes, and customer impact blast radius.',
        type: 'analysis',
        status: 'pending',
        dependencies: [],
        requiresHumanApproval: false,
      },
      {
        id: 'step-2',
        stepNumber: 2,
        title: 'Incident Commander Approval Checkpoint',
        description: 'SRE Lead must authorize customer-facing incident notice and emergency maintenance mode.',
        type: 'approval',
        status: 'waiting_approval',
        dependencies: ['step-1'],
        requiresHumanApproval: true,
      },
      {
        id: 'step-3',
        stepNumber: 3,
        title: 'Generate Local Status Page Notice',
        description: 'Create draft status update payload and customer advisory message in local queue.',
        type: 'action_task',
        status: 'pending',
        dependencies: ['step-2'],
        requiresHumanApproval: false,
      },
      {
        id: 'step-4',
        stepNumber: 4,
        title: 'Prepare Stakeholder Email Summary',
        description: 'Draft executive summary email for leadership distribution.',
        type: 'action_email',
        status: 'pending',
        dependencies: ['step-3'],
        requiresHumanApproval: false,
      },
      {
        id: 'step-5',
        stepNumber: 5,
        title: 'Audit & Record Verification',
        description: 'Confirm integrity of incident log entries and audit hashes in local storage.',
        type: 'verification',
        status: 'pending',
        dependencies: ['step-4'],
        requiresHumanApproval: false,
      },
    ];
  } else {
    title = `Workflow: ${prompt.length > 40 ? prompt.substring(0, 40) + '...' : prompt}`;
    steps = [
      {
        id: 'step-1',
        stepNumber: 1,
        title: 'Requirement Extraction & Data Analysis',
        description: `Analyze input parameters and validate compliance for request: "${prompt.slice(0, 60)}..."`,
        type: 'analysis',
        status: 'pending',
        dependencies: [],
        requiresHumanApproval: false,
      },
      {
        id: 'step-2',
        stepNumber: 2,
        title: 'Human Review & Operational Approval',
        description: 'Mandatory human approval gate required before proceeding with any state mutations.',
        type: 'approval',
        status: 'waiting_approval',
        dependencies: ['step-1'],
        requiresHumanApproval: true,
      },
      {
        id: 'step-3',
        stepNumber: 3,
        title: 'Execute Local Automation Tasks',
        description: 'Create structured task records and action manifests in local demo memory.',
        type: 'action_task',
        status: 'pending',
        dependencies: ['step-2'],
        requiresHumanApproval: false,
      },
      {
        id: 'step-4',
        stepNumber: 4,
        title: 'Prepare Notification Drafts',
        description: 'Draft communication payloads and audit trails for review.',
        type: 'action_email',
        status: 'pending',
        dependencies: ['step-3'],
        requiresHumanApproval: false,
      },
      {
        id: 'step-5',
        stepNumber: 5,
        title: 'Multi-point Verification & Final Sign-Off',
        description: 'Verify existence, non-corruption, and hash consistency of all created demo records.',
        type: 'verification',
        status: 'pending',
        dependencies: ['step-4'],
        requiresHumanApproval: false,
      },
    ];
  }

  const initialLogs: AuditLogEntry[] = [
    createAuditLog(
      'Workflow Plan Synthesized',
      'AI Agent',
      'info',
      `Parsed natural-language work request into 5 structured pipeline steps with 1 mandatory human gate.`
    ),
    createAuditLog(
      'Screening Evaluation Ready',
      'AI Agent',
      'info',
      `Matched 4 sample candidates against 5 weighted job requirements. Awaiting human manager review.`
    ),
  ];

  return {
    id: `WF-${Date.now().toString(36).toUpperCase()}`,
    title,
    prompt,
    createdAt: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    status: 'ready_for_review',
    activeStepIndex: 1, // Step 2 (Approval) is the active focal point
    steps,
    candidates: INITIAL_CANDIDATES,
    requirements: DEFAULT_JOB_REQUIREMENTS,
    simulatedRecords: [],
    auditLogs: initialLogs,
    approvalNotes: '',
    isAiGenerated: isAi,
    modelUsed: isAi ? 'Gemini 1.5 Pro (Configured)' : 'FlowPilot Deterministic Engine (Offline Demo)',
  };
}

export function getInitialWorkflowState(): WorkflowState {
  const initialLogs: AuditLogEntry[] = [
    {
      id: 'LOG-INIT-001',
      timestamp: '09:00:00',
      action: 'Workflow Plan Synthesized',
      actor: 'AI Agent',
      type: 'info',
      details: 'Parsed natural-language work request into 5 structured pipeline steps with 1 mandatory human gate.',
    },
    {
      id: 'LOG-INIT-002',
      timestamp: '09:00:01',
      action: 'Screening Evaluation Ready',
      actor: 'AI Agent',
      type: 'info',
      details: 'Matched 4 sample candidates against 5 weighted job requirements. Awaiting human manager review.',
    },
  ];

  return {
    id: 'WF-DEMO-2026',
    title: 'Candidate Screening & Interview Staging Pipeline',
    prompt:
      'Screen candidate profiles against our Senior Frontend Engineer requirements (React, TypeScript, Testing, 3+ yrs exp). Generate match evidence, require hiring manager approval, create onboarding tasks for approved candidates, and prepare draft invitations.',
    createdAt: '09:00:00',
    status: 'ready_for_review',
    activeStepIndex: 1,
    steps: [
      {
        id: 'step-1',
        stepNumber: 1,
        title: 'Profile Analysis & Criteria Scoring',
        description:
          'Scan applicant profiles against mandatory React, TypeScript, and 3+ yr requirements. Generate match score and evidence breakdown.',
        type: 'analysis',
        status: 'pending',
        dependencies: [],
        requiresHumanApproval: false,
      },
      {
        id: 'step-2',
        stepNumber: 2,
        title: 'Human Review & Shortlist Sign-Off',
        description:
          'Hiring manager reviews candidates exceeding match threshold. Requires explicit manual signoff before any action execution.',
        type: 'approval',
        status: 'waiting_approval',
        dependencies: ['step-1'],
        requiresHumanApproval: true,
      },
      {
        id: 'step-3',
        stepNumber: 3,
        title: 'Create Local ATS Task Records',
        description:
          'Provision internal candidate tracking records and evaluation rubrics in the local system.',
        type: 'action_task',
        status: 'pending',
        dependencies: ['step-2'],
        requiresHumanApproval: false,
      },
      {
        id: 'step-4',
        stepNumber: 4,
        title: 'Prepare Email Drafts & Calendar Holds',
        description:
          'Generate reviewable interview invitation drafts and provisional calendar holds for approved candidates.',
        type: 'action_email',
        status: 'pending',
        dependencies: ['step-3'],
        requiresHumanApproval: false,
      },
      {
        id: 'step-5',
        stepNumber: 5,
        title: 'Execution Verification & Integrity Audit',
        description:
          'Perform simulated integrity validation and existence checks on all generated local demo records before finalizing workflow.',
        type: 'verification',
        status: 'pending',
        dependencies: ['step-4'],
        requiresHumanApproval: false,
      },
    ],
    candidates: INITIAL_CANDIDATES,
    requirements: DEFAULT_JOB_REQUIREMENTS,
    simulatedRecords: [],
    auditLogs: initialLogs,
    approvalNotes: '',
    isAiGenerated: false,
    modelUsed: 'FlowPilot Deterministic Engine (Offline Demo)',
  };
}

export function generateSimulatedRecordsForApprovedCandidates(
  candidates: CandidateProfile[]
): SimulatedArtifact[] {
  const approvedCandidates = candidates.filter((c) => c.selectedForAction && c.matchScore >= 70);
  const records: SimulatedArtifact[] = [];

  approvedCandidates.forEach((c) => {
    // 1. Task Record
    const taskId = `TSK-${Math.floor(1000 + Math.random() * 9000)}`;
    records.push({
      id: taskId,
      type: 'task',
      title: `Interview Loop Prep: ${c.name}`,
      summary: `Internal recruiting task created for technical interview panel assignment and scorecard rubric.`,
      recipientOrOwner: 'Engineering Hiring Team',
      createdAt: new Date().toISOString(),
      verified: false,
      payload: {
        candidateId: c.id,
        candidateName: c.name,
        role: c.role,
        score: `${c.matchScore}%`,
        status: 'Interview Scheduled',
        interviewer1: 'Lead System Architect',
        interviewer2: 'Staff Frontend Engineer',
        rubric: ['Architecture (React 18)', 'Type Safety (TS)', 'Testing Strategies'],
      },
    });

    // 2. Email Draft
    const emailId = `EML-${Math.floor(1000 + Math.random() * 9000)}`;
    records.push({
      id: emailId,
      type: 'email_draft',
      title: `Draft Invitation: Interview for ${c.role}`,
      summary: `Pre-populated email draft with customized feedback praising candidate's ${c.skills.slice(0, 3).join(', ')} background.`,
      recipientOrOwner: `${c.name.toLowerCase().replace(' ', '.')}@example-demo.com`,
      createdAt: new Date().toISOString(),
      verified: false,
      payload: {
        subject: `FlowPilot / Next Steps: Technical Interview for Senior Frontend Engineer`,
        body: `Hi ${c.name},\n\nWe were very impressed by your extensive experience with ${c.skills.slice(0, 3).join(', ')}.\n\nWe would love to invite you to a 45-minute technical session with our engineering lead next week.\n\n(Simulated demo message — No real email was sent)`,
        isDraft: true,
      },
    });

    // 3. Calendar Hold
    const calId = `CAL-${Math.floor(1000 + Math.random() * 9000)}`;
    records.push({
      id: calId,
      type: 'calendar_invite',
      title: `Tentative Calendar Slot: ${c.name}`,
      summary: `Provisional calendar hold block placed in local scheduling queue.`,
      recipientOrOwner: 'calendar-hold@flowpilot.internal',
      createdAt: new Date().toISOString(),
      verified: false,
      payload: {
        event: `FlowPilot Round 1: ${c.name} & Engineering Lead`,
        duration: '45 mins',
        tentativeDate: 'Next Tuesday at 2:00 PM EST',
        room: 'Virtual Meeting Room A (Demo)',
      },
    });
  });

  return records;
}

export function computeRecordHash(record: SimulatedArtifact): string {
  const str = `${record.id}|${record.title}|${record.createdAt}|${JSON.stringify(record.payload)}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return `SIM-TOKEN-${Math.abs(hash).toString(16).padStart(8, '0').toUpperCase()}`;
}

export function verifyRecordToken(record: SimulatedArtifact): boolean {
  if (!record.verificationHash) return false;
  return record.verificationHash === computeRecordHash(record);
}

