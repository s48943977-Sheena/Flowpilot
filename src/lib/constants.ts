import { CandidateProfile, JobRequirement, WorkflowPreset } from '@/types/workflow';

export const WORKFLOW_PRESETS: WorkflowPreset[] = [
  {
    id: 'candidate-screening',
    title: 'Screen Senior Frontend Candidates',
    category: 'Talent & Hiring',
    badge: 'Hackathon Primary Demo',
    prompt:
      'Screen candidate profiles against our Senior Frontend Engineer requirements (React, TypeScript, Testing, 3+ yrs exp). Generate match evidence, require hiring manager approval, create onboarding tasks for approved candidates, and prepare draft invitations.',
  },
  {
    id: 'support-escalation',
    title: 'High-Severity Incident Response',
    category: 'Ops & IT',
    badge: 'Automation',
    prompt:
      'Analyze P1 incident ticket #INC-892, verify database replica status, require SRE lead signoff, prepare customer incident report draft, and schedule post-mortem sync hold.',
  },
  {
    id: 'procurement-audit',
    title: 'Vendor Contract & Compliance Check',
    category: 'Finance & Legal',
    badge: 'Governance',
    prompt:
      'Audit Q3 vendor software renewal quotes against procurement policy caps, verify SOC2 compliance certificates, require VP approval, and create ERP payment milestone tasks.',
  },
];

export const DEFAULT_JOB_REQUIREMENTS: JobRequirement[] = [
  { id: 'req-1', label: 'React 18+ & Modern Frontend Architecture', category: 'Mandatory', weight: 25 },
  { id: 'req-2', label: 'TypeScript Type-Safety & Generics', category: 'Mandatory', weight: 25 },
  { id: 'req-3', label: 'Automated Testing (Jest / Vitest / Playwright)', category: 'Mandatory', weight: 20 },
  { id: 'req-4', label: '3+ Years Production Web Application Experience', category: 'Mandatory', weight: 20 },
  { id: 'req-5', label: 'Next.js App Router & Server Components', category: 'Preferred', weight: 10 },
];

export const INITIAL_CANDIDATES: CandidateProfile[] = [
  {
    id: 'cand-1',
    name: 'Elena Rostova',
    role: 'Senior Frontend Architect',
    experienceYears: 6,
    skills: ['React', 'TypeScript', 'Next.js', 'Playwright', 'Jest', 'Tailwind CSS', 'GraphQL'],
    education: 'B.S. Software Engineering, Georgia Tech',
    matchScore: 94,
    matchStatus: 'strong_match',
    matchedRequirements: [
      'React 18+ & Modern Frontend Architecture',
      'TypeScript Type-Safety & Generics',
      'Automated Testing (Jest / Vitest / Playwright)',
      '3+ Years Production Web Application Experience',
      'Next.js App Router & Server Components',
    ],
    missingRequirements: [],
    evidenceSummary:
      'Elena demonstrates 6 years of production React and TypeScript experience. Led frontend testing suite migration achieving 88% code coverage. Deep experience with Next.js App Router and design system architectures.',
    aiRecommendation:
      'Strongly recommended for technical interview round. Directly aligns with all 5 mandatory and preferred requirements.',
    selectedForAction: true,
  },
  {
    id: 'cand-2',
    name: 'Marcus Chen',
    role: 'Frontend UI Engineer',
    experienceYears: 4,
    skills: ['React', 'TypeScript', 'Jest', 'Tailwind CSS', 'Redux Toolkit', 'REST APIs'],
    education: 'B.S. Computer Science, UC Davis',
    matchScore: 82,
    matchStatus: 'strong_match',
    matchedRequirements: [
      'React 18+ & Modern Frontend Architecture',
      'TypeScript Type-Safety & Generics',
      'Automated Testing (Jest / Vitest / Playwright)',
      '3+ Years Production Web Application Experience',
    ],
    missingRequirements: ['Next.js App Router & Server Components'],
    evidenceSummary:
      'Solid 4-year history of React + TypeScript components. Writes unit tests with Jest. Experienced in UI component libraries, though Next.js server components experience is limited.',
    aiRecommendation:
      'Recommended for interview. Meets all core mandatory qualifications; can quickly bridge Next.js App Router conventions.',
    selectedForAction: true,
  },
  {
    id: 'cand-3',
    name: 'Priya Patel',
    role: 'Full-Stack Developer',
    experienceYears: 3,
    skills: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'CSS'],
    education: 'B.E. Information Technology, Mumbai Univ',
    matchScore: 62,
    matchStatus: 'potential_match',
    matchedRequirements: [
      'React 18+ & Modern Frontend Architecture',
      '3+ Years Production Web Application Experience',
    ],
    missingRequirements: [
      'TypeScript Type-Safety & Generics',
      'Automated Testing (Jest / Vitest / Playwright)',
      'Next.js App Router & Server Components',
    ],
    evidenceSummary:
      'Strong JavaScript and React fundamentals with 3 years tenure. However, candidate lacks formal TypeScript production projects and did not demonstrate automated testing suites in code samples.',
    aiRecommendation:
      'Borderline profile. Human reviewer should determine if TypeScript on-the-job upskilling is acceptable before proceeding.',
    selectedForAction: false,
  },
  {
    id: 'cand-4',
    name: 'Leo Sterling',
    role: 'Junior Web Developer',
    experienceYears: 1,
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Vue.js Basics', 'Git'],
    education: 'Coding Academy Graduate 2025',
    matchScore: 36,
    matchStatus: 'unqualified',
    matchedRequirements: [],
    missingRequirements: [
      'React 18+ & Modern Frontend Architecture',
      'TypeScript Type-Safety & Generics',
      'Automated Testing (Jest / Vitest / Playwright)',
      '3+ Years Production Web Application Experience',
      'Next.js App Router & Server Components',
    ],
    evidenceSummary:
      'Candidate has 1 year of junior web experience focused primarily on basic JavaScript and Vue. Does not meet minimum 3-year seniority threshold and lacks React/TypeScript testing experience.',
    aiRecommendation:
      'Unqualified for Senior role. Recommend automated friendly disposition and retention for junior apprentice pools.',
    selectedForAction: false,
  },
];
