'use client';

import React, { useState } from "react";
import { AlertCircle, HelpCircle, ShieldAlert, Sparkles, AlertTriangle } from "lucide-react";

export default function PropagandaTracker() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [evaluationType, setEvaluationType] = useState<"propaganda-evaluate" | "legal-info">("propaganda-evaluate");

  // Sample real data cards containing evidence, text description, and social targets of defamation cases in Bangladesh
  const reports = [
    {
      id: "PT-041",
      title: "False Media Assault & Character Assassination (চরিত্রহরণ ও ব্ল্যাকমেইল)",
      bengaliTitle: "মিথ্যা ব্ল্যাকমেইল ও গুজব ট্র্যাকার",
      description: "False audio/video clips circulating on TikTok and Facebook to extort money from an engineer. The perpetrator threatened to label him as abusive unless 15 Lakh BDT Mohorana was paid immediately.",
      evidence: "Screenshots of WhatsApp conversations, modified profile links, bank statements showing extortion attempt",
      targetUrl: "TikTok @f_rumor_channel; FB ID: 1002341255551",
      status: "Verified Defamation / False Allegation",
      badgeColor: "bg-[#ff0055]/15 text-[#ff0055] border-[#ff0055]/30"
    },
    {
      id: "PT-042",
      title: "Extortion under Threat of false Rape/Abuse filing (ধর্ষণের মামলা দেয়ার হুমকি)" ,
      bengaliTitle: "মিথ্যা মামলার ভীতি প্রদর্শন",
      description: "Targeted viral status post accusing an IT coordinator of harassment. Screenshots leak proving the accused was out of the country on the stated date. Culprit requested written transfer of joint flat ownership to settle.",
      evidence: "Passport exit stamp logs, flight itinerary, original Discord blackmail logs",
      targetUrl: "Facebook Post Ref: 2024BDM-01",
      status: "Malicious Blackmail / Extortion",
      badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/30"
    },
    {
      id: "PT-043",
      title: "Fabricated Domestic Abuse Viral Rumor (সামাজিক যোগাযোগ মাধ্যমে অপপ্রচার)",
      bengaliTitle: "ঘরোয়া বিবাদের মিথ্যা গুজব",
      description: "Viral rumor posted on a parenting community online claiming a father kidnapped his own minor child. Verification shows the father has legal guardianship from Bangladesh Family Court.",
      evidence: "Bangladesh Family Court Order Case No. 412/2023, custody decree",
      targetUrl: "Parenting Group Post: #38910",
      status: "Factual Custody Order Distorted",
      badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
    }
  ];

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setResponse(null);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: evaluationType }),
      });
      const data = await res.json();
      if (res.ok) {
        setResponse(data.text);
      } else {
        setResponse("Error analyzing narrative. The verification core is online but experienced high volume. Guidance: Back up all evidence transcripts safely locally.");
      }
    } catch (e) {
      console.error(e);
      setResponse("Offline Verification Mode: Safeguard your transcripts in local offline drives. For direct legal investigation, please submit your details through our secure portal.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Evidence Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div
            key={report.id}
            className="group relative bg-[#1a1a1a]/50 hover:bg-[#1a1a1a]/75 border border-white/5 hover:border-[#ff0055]/30 rounded-2xl p-6 transition duration-300 flex flex-col justify-between overflow-hidden backdrop-blur-md"
          >
            {/* Ambient Background Glow on Hover */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff0055]/5 rounded-full filter blur-3xl group-hover:bg-[#ff0055]/10 transition duration-300" />
            
            <div className="relative space-y-4">
              <div className="flex justify-between items-start gap-4">
                <span className="text-xs font-mono text-[#ff0055] font-semibold tracking-wider">
                  {report.id}
                </span>
                <span className={`text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded bg-[#0d0d0d] border ${report.badgeColor}`}>
                  {report.status}
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-gray-200 group-hover:text-white transition">
                  {report.title}
                </h4>
                <p className="text-xs text-[#ff0055] font-medium mt-1 font-sans">
                  {report.bengaliTitle}
                </p>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed font-sans">
                {report.description}
              </p>

              {/* Evidence Panel */}
              <div className="p-3.5 bg-black rounded border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#ff0055]" />
                  Secured Evidence Log
                </div>
                <p className="text-xs font-mono text-gray-300">
                  {report.evidence}
                </p>
              </div>
            </div>

            <div className="relative pt-4 mt-4 border-t border-white/5 flex flex-col gap-1">
              <span className="text-[10px] text-gray-500 uppercase font-semibold">Origin Social Media ID / Handles</span>
              <span className="text-xs font-mono text-gray-400 break-all select-all hover:text-[#ff0055] transition">
                {report.targetUrl}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Verification / Tracker submission */}
      <div className="bg-gradient-to-r from-[#141414] to-[#0d0d0d] border border-white/10 rounded-2xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute -bottom-6 right-1/4 w-96 h-96 bg-[#ff0055]/5 rounded-full filter blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ff0055]/15 text-[#ff0055] border border-[#ff0055]/30 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            AI Propaganda Verification & Legal Assistance Core
          </div>
          
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Verify Rumors & Consult Legal Frameworks
          </h3>
          <p className="text-sm text-gray-400 mt-2">
            Is a malicious rumor circulating online, or are you facing threats of a fraudulent lawsuit? Submit the exact narrative or case threats details to obtain instant objective verification and legal education based on Bangladesh laws.
          </p>

          <form onSubmit={handleEvaluate} className="mt-6 space-y-4">
            <div className="flex flex-wrap gap-4 mb-4">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                <input
                  type="radio"
                  name="evalType"
                  checked={evaluationType === "propaganda-evaluate"}
                  onChange={() => setEvaluationType("propaganda-evaluate")}
                  className="accent-[#ff0055] focus:ring-0"
                />
                Propaganda & Defamation Analysis
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                <input
                  type="radio"
                  name="evalType"
                  checked={evaluationType === "legal-info"}
                  onChange={() => setEvaluationType("legal-info")}
                  className="accent-[#ff0055] focus:ring-0"
                />
                Penal Code False Litigations Info (CPC 211 / Mohorana abuse info)
              </label>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={evaluationType === "propaganda-evaluate" 
                    ? "Paste the malicious post transcript or defamation message text here..." 
                    : "Describe the false case threat e.g., 'Threatened with false rape case unless plot is signed'..."
                  }
                  required
                  className="w-full bg-[#0d0d0d] border border-white/10 focus:border-[#ff0055] rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-[#ff0055] to-[#990000] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition duration-200 shrink-0 shadow-lg shadow-[#ff0055]/15 disabled:opacity-50 cursor-pointer hover:opacity-90"
              >
                {isLoading ? "Analyzing..." : "Analyze Now"}
              </button>
            </div>
          </form>

          {response && (
            <div className="mt-6 p-5 rounded bg-black border border-[#ff0055]/35 leading-relaxed text-sm text-gray-300 animate-fade-in whitespace-pre-wrap font-sans">
              <div className="flex items-center gap-2 text-xs font-bold text-[#ff0055] uppercase tracking-widest mb-3">
                <AlertTriangle className="w-4 h-4 text-[#ff0055]" />
                Dignity Bangladesh - AI Evaluation
              </div>
              {response}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
