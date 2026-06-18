'use client';

import React, { useState } from "react";
import { BookOpen, Calendar, ChevronRight, Filter, Gavel, ShieldAlert, Award } from "lucide-react";

export default function CrimeDirectory() {
  const [filterType, setFilterType] = useState("ALL");

  const directoryCases = [
    {
      id: "BDC-892",
      title: "Dowry Abuse False Litigation for Property Acquisition",
      bengaliTitle: "মিথ্যা যৌতুক মামলা ও সম্পত্তি আত্মসাতের চেষ্টা",
      courtCase: "Nari o Shishu Case #411/2023",
      location: "Dhaka (ঢাকা মহানগরী)",
      date: "October 2024",
      summary: "Under Section 11c of the Nari o Shishu Nirjatan Daman Act, false allegations of physical torture for dowry BDT 10 Lakh were filed. Digital evidence and testimony proved the defendant was residing at his office during the alleged incident timing. Verdict proved innocent.",
      category: "FALSE_LITIGATION",
      impact: "Loss of government job designation, social isolation, 14 days arbitrary confinement."
    },
    {
      id: "BDC-414",
      title: "Extortion under Threat of Fabricated Rape Allegation",
      bengaliTitle: "মিথ্যা ধর্ষণের মামলার ভয় দেখিয়ে বিপুল অর্থ আদায়ের চেষ্টা",
      courtCase: "Police Station FIR Case 12/2024",
      location: "Chattogram (চট্টগ্রাম)",
      date: "January 2025",
      summary: "A private university student was blackmailed with audio-modified recordings. The suspect demanded 5 Lakh BDT, threatening a police report for non-consensual acts. Culprit was arrested red-handed with financial logs by Detective Branch during extortion transaction.",
      category: "EXTORTION_BLACKMAIL",
      impact: "Severe psychological trauma, suspension from academics during inquiry phase."
    },
    {
      id: "BDC-309",
      title: "Extreme Domestic Violence & Forced Suicide Provocation",
      bengaliTitle: "পুরুষের ওপর নৃশংস পারিবারিক নির্যাতন ও আত্মহত্যায় বাধ্যকরণ",
      courtCase: "Penal Code Section 306 Case #92/2023",
      location: "Sylhet (সিলেট)",
      date: "December 2023",
      summary: "A local retail businessman faced intense psychological abuse, physical lockout from his own home, and threats of fake litigation from family-in-laws. Driven to intense depression, the victim tragically self-terminated. Court is investigating digital screenshots and suicide notes detailing systematic abuse.",
      category: "DOMESTIC_VIOLENCE",
      impact: "Loss of life, absolute deprivation of children's parental custody."
    },
    {
      id: "BDC-112",
      title: "Denmohor Price Escalation Abuse & Financial Extortion",
      bengaliTitle: "দেনমোহর ও মোহরানার অসংগতিপূর্ণ অপব্যবহার",
      courtCase: "Civil Suit 1022/2024",
      location: "Rajshahi (রাজশাহী)",
      date: "March 2025",
      summary: "Marriage lasted 3 weeks. A massive Denmohor fee of 25 Lakh BDT (far beyond the groom's income scale) was written maliciously. Immediately upon dispute, legal notice for divorce and immediate massive summary recovery was filed, aiming at financial destruction of the victim's family.",
      category: "FINANCIAL_FRAUD",
      impact: "Immediate freeze of assets, seizure of paternal ancestral homestead."
    },
    {
      id: "BDC-781",
      title: "Parental Separation & Cruel Alienation of Child",
      bengaliTitle: "সন্তান থেকে পিতাকে নির্মম উপায়ে বিচ্ছিন্নকরণ",
      courtCase: "Family Guardian Suit Case #19/2024",
      location: "Khulna (খুলনা)",
      date: "June 2024",
      summary: "Despite court order ensuring weekly visitation hours, child was systematically hidden, and fake kidnapping narrative was uploaded onto Facebook communities. The father faced offline harassment before legal visitation was restored with major fines.",
      category: "CUSTODY_ALiENATION",
      impact: "Severe child alienation trauma, massive structural legal costs."
    }
  ];

  const filteredCases = filterType === "ALL" 
    ? directoryCases 
    : directoryCases.filter(c => c.category === filterType);

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 border-b border-white/10 pb-6">
        <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#ff0055] flex items-center gap-2 mr-2">
          <Filter className="w-4 h-4" /> Filter Crime Directory:
        </span>
        {[
          { key: "ALL", label: "All Cases (সব অপরাধ)" },
          { key: "FALSE_LITIGATION", label: "False Litigations (মিথ্যা মামলা)" },
          { key: "EXTORTION_BLACKMAIL", label: "Blackmail & Threats (ব্ল্যাকমেইল)" },
          { key: "DOMESTIC_VIOLENCE", label: "Domestic Abuse (পারিবারিক নির্যাতন)" },
          { key: "FINANCIAL_FRAUD", label: "Financial / Denmohor Abuse (আর্থিক প্রতারণা)" },
          { key: "CUSTODY_ALiENATION", label: "Parental Separation (অভিভাবকত্ব বঞ্চিত)" }
        ].map((btn) => (
          <button
            key={btn.key}
            onClick={() => setFilterType(btn.key)}
            className={`px-4 py-2 rounded text-xs font-medium border transition-all duration-200 cursor-pointer ${
              filterType === btn.key 
                ? "bg-[#ff0055]/15 text-white border-[#ff0055] shadow-[0_0_15px_rgba(255,0,85,0.25)]" 
                : "bg-[#141414] text-gray-400 border-white/5 hover:border-white/20 hover:text-gray-200"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Grid of documented criminal incidents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCases.map((incident) => (
          <div 
            key={incident.id} 
            className="group bg-[#1a1a1a]/50 border border-white/5 hover:border-[#ff0055]/30 rounded-2xl p-6 transition duration-300 space-y-4 flex flex-col justify-between backdrop-blur-md"
          >
            <div className="space-y-3">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#ff0055] bg-[#ff0055]/10 px-2.5 py-1 rounded">
                  CASE REF: {incident.id}
                </span>
                <span className="text-xs font-medium text-gray-400 font-mono flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-500" /> {incident.date}
                </span>
              </div>

              <div>
                <h4 className="text-lg font-bold text-gray-100 group-hover:text-white transition duration-200 leading-snug">
                  {incident.title}
                </h4>
                <p className="text-xs font-semibold text-[#ff0055] mt-1">
                  {incident.bengaliTitle}
                </p>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed font-sans">
                {incident.summary}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="p-2.5 rounded bg-[#0d0d0d] border border-white/5">
                  <div className="text-[9px] uppercase tracking-wider text-gray-500 font-bold flex items-center gap-1 mb-1">
                    <Gavel className="w-3 h-3 text-[#ff0055]" /> Court Reference
                  </div>
                  <p className="text-xs font-mono text-gray-300 truncate">
                    {incident.courtCase}
                  </p>
                </div>

                <div className="p-2.5 rounded bg-[#0d0d0d] border border-white/5">
                  <div className="text-[9px] uppercase tracking-wider text-gray-500 font-bold flex items-center gap-1 mb-1">
                    <Filter className="w-3 h-3 text-[#ff0055]" /> Location
                  </div>
                  <p className="text-xs font-mono text-gray-300">
                    {incident.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Impact section */}
            <div className="pt-4 border-t border-white/5 space-y-1.5 mt-4">
              <div className="text-[9px] font-bold uppercase tracking-widest text-[#ff0055] flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-[#ff0055]" />
                Societal & Legal Impact on Victim
              </div>
              <p className="text-xs font-sans text-gray-400">
                {incident.impact}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <div className="text-center py-12 bg-[#1a1a1a]/50 border border-white/5 rounded-2xl">
          <p className="text-gray-400 text-sm">No cases currently found for this category. All submissions are filtered manually.</p>
        </div>
      )}
    </div>
  );
}
