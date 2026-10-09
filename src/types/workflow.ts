export type WorkflowStatus =
  | 'idle'
  | 'generating'
  | 'ready_for_review'
  | 'executing'
  | 'verifying'
  | 'completed'
  | 'rejected';

export type StepStatus =
  | 'pending'
  | 'in_progress'
  | 'waiting_approval'
  | 'approved'
  | 'rejected'
  | 'executing'
  | 'verified'
  | 'failed'
  | 'skipped';

export type StepType =
  | 'analysis'
  | 'approval'
  | 'action_task'
  | 'action_email'
  | 'action_calendar'
  | 'verification';

export type CandidateMatchStatus = 'strong_match' | 'potential_match' | 'unqualified';

export interface CandidateProfile {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  skills: string[];
  education: string;
  matchScore: number;
  matchStatus: CandidateMatchStatus;
  matchedRequirements: string[];
  missingRequirements: string[];
  evidenceSummary: string;
  aiRecommendation: string;
  selectedForAction: boolean;
}

export interface JobRequirement {
  id: string;
  label: string;
  category: 'Mandatory' | 'Preferred';
  weight: number;
}

export interface SimulatedArtifact {
  id: string;
  type: 'task' | 'email_draft' | 'calendar_invite' | 'screening_report';
  title: string;
  summary: string;
  recipientOrOwner: string;
  payload: Record<string, unknown>;
  createdAt: string;
  verified: boolean;
  verificationTimestamp?: string;
  verificationHash?: string;
}

export interface WorkflowStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  type: StepType;
  status: StepStatus;
  dependencies: string[];
  requiresHumanApproval: boolean;
  approvalDecision?: 'approved' | 'rejected' | null;
  approvalNotes?: string;
  approvalTimestamp?: string;
  artifactRefId?: string;
  simulatedArtifact?: SimulatedArtifact;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  stepId?: string;
  stepNumber?: number;
  action: string;
  actor: 'User' | 'AI Agent' | 'System Auditor';
  type: 'info' | 'success' | 'warning' | 'error';
  details: string;
  recordId?: string;
}

export interface WorkflowPreset {
  id: string;
  title: string;
  category: string;
  prompt: string;
  badge: string;
}

export interface WorkflowState {
  id: string;
  title: string;
  prompt: string;
  createdAt: string;
  status: WorkflowStatus;
  activeStepIndex: number;
  steps: WorkflowStep[];
  candidates: CandidateProfile[];
  requirements: JobRequirement[];
  simulatedRecords: SimulatedArtifact[];
  auditLogs: AuditLogEntry[];
  approvalNotes: string;
  isAiGenerated: boolean;
  modelUsed?: string;
}
