import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FlowPilot | Autonomous Work Orchestrator with Human Verification',
  description:
    'HackNowa Global Hackathon 2026 entry for Future of Work & Automation. Turns natural-language requests into structured reviewable workflows with human approval and verified execution.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#090d16] text-slate-100 antialiased selection:bg-indigo-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
