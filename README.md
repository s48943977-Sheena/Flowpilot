# FlowPilot ✈️
### Intelligent Human-in-the-Loop Workflow Automation
**HackNowa Global Hackathon 2026** • Category: *Future of Work & Automation*

FlowPilot turns natural-language work requests into structured, reviewable workflows with mandatory human approval checkpoints, safe local execution, and simulated record integrity validation.

---

## 🌟 The Problem & Solution

### The Problem
Autonomous AI agents are capable of high-speed work execution, but enterprise operations cannot afford "black box" decisions. Unchecked AI models can draft erroneous contracts, send unauthorized emails, or miscalculate candidate qualifications without human oversight.

### The FlowPilot Solution
FlowPilot introduces **Governed Autonomous Workflows**:
1. **Natural-Language Understanding**: Converts freeform prompts into a 5-step structured pipeline.
2. **Explainable Criteria Screening**: Evaluates data (e.g. candidate resumes) against explicit, weighted requirements and provides transparent AI evidence for every match score.
3. **Mandatory Human Gate**: High-impact downstream mutations are blocked until a human manager reviews evidence, adds feedback notes, and clicks **Approve**.
4. **Safe Local Demo Execution**: Creates isolated task records, email drafts, and provisional calendar holds.
5. **Simulated Integrity Validation**: Confirms created records exist in local state and attaches deterministic validation tokens before marking steps complete.

---

## 🚀 Quick Start for Windows Beginners

Node.js LTS (v24.20.0) and npm (v11.19.0) are already installed on your system.

### Step 1: Open Windows Terminal / PowerShell
Press `Win + X` and select **Terminal** (or **PowerShell**), then navigate to your project folder:

```powershell
cd c:\Users\HP\Desktop\flowpilot
```

> **Note for Windows Beginners**: If your PowerShell window was opened before Node was installed, reopen a new PowerShell window so the system refreshes your PATH automatically.

### Step 2: Start the FlowPilot Development Server
Run this single command:

```powershell
npm run dev
```

### Step 3: Open in Your Web Browser
Open your browser and navigate to:
```
http://localhost:3000
```

FlowPilot will load immediately in a modern dark dashboard!

---

## 📋 Interactive Manual Testing Checklist

Follow this quick 2-minute walkthrough to test every feature of the MVP:

| Step | Action | Expected Result |
| :--- | :--- | :--- |
| **1. Review Pre-loaded Pipeline** | Look at the dashboard upon opening. | 5 numbered steps are displayed. Step 2 shows **Awaiting Approval** with an amber indicator. |
| **2. Inspect Candidate Screening** | Under the sub-tab *Candidate Screening & Explainable Evidence*, review the 4 sample candidates. | Elena Rostova (94% match) and Marcus Chen (82%) show strong matches; Priya Patel (62%) is a potential match; Leo Sterling (36%) is unqualified. Clear AI rationale and matched/missing tags are displayed. |
| **3. Toggle Candidates** | Uncheck or check any candidate's *Include in Automated Interview Loop* box. | Candidate selection toggles and an audit log entry is added to the activity timeline. |
| **4. Human Signoff** | Switch to the *Step 2: Human Approval Gate* sub-tab. Enter approval notes (e.g. *"Approved for technical rounds"*). | Downstream action impact summary is displayed with clear safety disclaimers. |
| **5. Approve & Execute** | Click the green **Approve & Execute Pipeline** button. | Step 2 turns green (**Approved**). Steps 3, 4, and 5 sequentially execute with live spinners and complete with **Verified** badges. |
| **6. Inspect Demo Records** | Click **Demo Records** on the sidebar or click *View Demo Records* in the summary. | Inspect generated ATS Task Records (`TSK-...`), Email Drafts (`EML-...`), and Calendar Holds (`CAL-...`). Switch between *Preview* and *Payload JSON* views. |
| **7. Inspect Audit Trail** | Click **Activity Audit** on the sidebar. | Real-time audit log entries show timestamps, actors (User, AI Agent, System Auditor), and artifact IDs. Filter by actor. |
| **8. Test Workflows Tab** | Click **Workflows** on the sidebar. | View the full dependency graph and execution statuses. |
| **9. Test Custom Request** | Go back to Dashboard, type a custom prompt or click the *High-Severity Incident Response* preset, then click **Generate Workflow**. | A fresh 5-stage pipeline is generated instantly. |
| **10. Test Reset Demo** | Click the **Reset Demo** button in the top right header. | All state, records, and logs reset back to the pristine initial demo state. |

---

## 🛡️ Safety & AI Configuration

### Offline / Keyless Mode (Default)
FlowPilot runs **100% offline and keyless** out of the box using a deterministic rule engine. No API keys or credit card setups are required.

### Optional AI Integration (Gemini / OpenAI)
If you wish to enable live AI generation:
1. Copy `.env.example` to `.env.local`:
   ```powershell
   Copy-Item .env.example .env.local
   ```
2. Open `.env.local` and paste your key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
3. Restart the server (`npm run dev`).
4. The server-side route `/api/generate-workflow` securely calls Gemini without ever exposing keys to client-side code.

### Safe Simulated Execution Guarantee
FlowPilot strictly labels all generated outputs as simulated demo artifacts. **No real emails are sent, and no real calendars are modified.**

---

## 🏗️ Project Architecture

```
flowpilot/
├── src/
│   ├── app/
│   │   ├── api/generate-workflow/route.ts  # Secure server-side AI endpoint
│   │   ├── globals.css                     # Tailwind & dark theme styling
│   │   ├── layout.tsx                      # App layout & meta tags
│   │   └── page.tsx                        # Main dashboard & interactive cockpit
│   ├── components/
│   │   ├── Header.tsx                      # Top navigation, status indicators, Reset Demo
│   │   ├── Sidebar.tsx                     # Primary navigation tabs & category info
│   │   ├── WorkflowInput.tsx               # Natural-language prompt & quick presets
│   │   ├── WorkflowSteps.tsx               # Numbered step cards & status badges
│   │   ├── CandidateScreeningPanel.tsx     # Criteria checklist, match scores & AI evidence
│   │   ├── ApprovalPanel.tsx               # Human approval gate, signoff notes & buttons
│   │   ├── DemoRecordsViewer.tsx           # Simulated record inspector & JSON viewer
│   │   ├── ExecutionTimeline.tsx           # Real-time activity audit log with actor filters
│   │   └── ResultsSummary.tsx              # Statistics, time saved & verified artifacts
│   ├── lib/
│   │   ├── constants.ts                    # Presets, job criteria & sample candidate profiles
│   │   └── workflowEngine.ts               # Synthesis engine, record simulator & hash verifier
│   └── types/
│       └── workflow.ts                     # TypeScript interfaces
├── .env.example                            # Safe template for optional keys
├── .gitignore                              # Excludes .env.local, node_modules, and build outputs
├── package.json                            # Next.js 14, React 18, Tailwind CSS, Lucide icons
├── tsconfig.json                           # TypeScript configuration with @/* alias
└── README.md                               # Project documentation
```

---

## 🏆 HackNowa 2026 Evaluation Highlights

- **Category Alignment**: Demonstrates how autonomous AI and enterprise workforce governance can coexist safely.
- **Explainability**: Every candidate match score is backed by granular evidence and checklist verification rather than an unexplainable number.
- **Robustness**: Runs completely offline, resilient to network dropouts or absent API keys.
- **Verification Guarantee**: Records undergo simulated integrity validation to confirm existence and consistency in local state before actions are declared successful.

---

*Built with ❤️ for HackNowa Global Hackathon 2026.*
