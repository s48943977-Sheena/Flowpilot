import { NextRequest, NextResponse } from 'next/server';
import { generateStructuredWorkflow } from '@/lib/workflowEngine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = body?.prompt || 'Screen candidate profiles for Senior Frontend Engineer';

    const geminiKey = process.env.GEMINI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    // If Gemini key is provided, we can query Gemini securely server-side
    if (geminiKey) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `You are FlowPilot workflow engine. Turn this user request into a title and 5 concise steps: "${prompt}". Return JSON with keys: title, steps (array of 5 objects with title, description, requiresHumanApproval boolean). Output pure JSON only.`,
                    },
                  ],
                },
              ],
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const text =
            geminiData?.candidates?.[0]?.content?.parts?.[0]?.text?.replace(/```json|```/g, '').trim() || '';
          if (text) {
            const parsed = JSON.parse(text);
            const workflow = generateStructuredWorkflow(prompt, true);
            workflow.title = parsed.title || workflow.title;
            if (Array.isArray(parsed.steps) && parsed.steps.length > 0) {
              workflow.steps = parsed.steps.map((s: { title: string; description: string; requiresHumanApproval: boolean }, idx: number) => ({
                id: `step-${idx + 1}`,
                stepNumber: idx + 1,
                title: s.title,
                description: s.description,
                type: idx === 0 ? 'analysis' : idx === 1 ? 'approval' : idx === 4 ? 'verification' : 'action_task',
                status: idx === 0 ? 'verified' : idx === 1 ? 'waiting_approval' : 'pending',
                dependencies: idx === 0 ? [] : [`step-${idx}`],
                requiresHumanApproval: idx === 1 || Boolean(s.requiresHumanApproval),
              }));
            }
            workflow.modelUsed = 'Google Gemini 1.5 Flash (Live Server API)';
            return NextResponse.json({ success: true, workflow });
          }
        }
      } catch (aiErr) {
        console.warn('AI API call failed or timed out, falling back to local engine:', aiErr);
      }
    }

    // Default: Fast, deterministic, 100% offline-ready workflow generator
    const workflow = generateStructuredWorkflow(prompt, false);
    return NextResponse.json({
      success: true,
      workflow,
      note: 'Generated via FlowPilot Deterministic Engine (Offline Demo)',
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown server error';
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}
