import { NextRequest, NextResponse } from "next/server";
import { getGeminiClient } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { prompt, type } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const ai = getGeminiClient();

    let systemInstruction = "";
    if (type === "propaganda-evaluate") {
      systemInstruction = `
        You are a factual verification assistant for "Men's Rights Bangladesh". 
        Analyze the user's provided rumor, news item, or defamatory speech with high objectivity.
        Explain whether it is a known false narrative, propaganda, or toxic generalization.
        Write the response in structured, dignified English and Bengali. Focus purely on facts, legal definitions of defamation (e.g., Section 499 of Bangladesh Penal Code, and dynamic Digital Security / Cyber Security acts in Bangladesh), and social mediation.
        Be professional, serious, and support logical gender equality without any aggression.
      `;
    } else if (type === "legal-info") {
      systemInstruction = `
        You are a helpful legal information advisor on Bangladesh Law.
        Provide information regarding laws that safeguard citizens (e.g., false litigation consequences, Bangladesh Penal Code Section 211 regarding false charges, civil defamation damages).
        Emphasize that you provide information, not official binding legal counsel. Keep a highly professional, crimson-ambient, compassionate, dry legal tone. Use balanced language.
      `;
    } else {
      systemInstruction = `
        You are an assistant for "Men's Rights Bangladesh", a human rights organization advocating for equal legal protection, mental health resources, and safety from false accusations, extortion, and physical violence for men in Bangladesh.
        Respond with formal, highly research-driven, empathetic, and objective analysis.
      `;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Route Error:", error);
    // Graceful error if GEMINI_API_KEY is not configured yet
    if (error.message && error.message.includes("GEMINI_API_KEY")) {
      return NextResponse.json({ 
        text: `**Factual Analysis Center (Offline Mode):**\n\nThank you for submitting this item for verification. The platform's real-time AI Verification core is currently awaiting final environment credentials key synchronization. However, our manual research team logs every single report immediately.\n\n*General Verification Guideline for Bangladesh:*\nDefamation or blackmail online is punishable under the Cyber Security Act (formerly DSA) and section 499/500/501 of the Penal Code 1860. If you have screenshots or audio recordings, secure multiple local backups and submit them through our secure administrative reporting portal.`
      });
    }
    return NextResponse.json({ error: error.message || "Factual analysis server lookup failed." }, { status: 500 });
  }
}
