'use client';

import React, { useState } from "react";
import Image from "next/image";
import { 
  Shield, 
  Scale, 
  HelpCircle, 
  Users, 
  HeartHandshake, 
  FileCheck2, 
  Menu, 
  X, 
  BookOpen, 
  MessageSquareWarning, 
  DollarSign, 
  Mail, 
  PhoneCall, 
  CheckCircle,
  TrendingDown,
  AlertOctagon,
  Award
} from "lucide-react";
import SecureSubmitForm from "@/components/SecureSubmitForm";
import PropagandaTracker from "@/components/PropagandaTracker";
import CrimeDirectory from "@/components/CrimeDirectory";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("HOME");
  const [reportSuccessId, setReportSuccessId] = useState<string | null>(null);

  // Stats Data
  const stats = [
    { value: "81%", label: "Cases Filed are Unchecked / Unreconciled", desc: "Most false litigation cases proceed long-term without evidence checks due to structural legislative gaps." },
    { value: "40,000+", label: "False Dowry Litigations (Approx. Annually)", desc: "Abuse of Dowry Prohibition Act & Nari O Shishu Section 11c for divorce leverage." },
    { value: "2/3", label: "Men Suffering Extreme Silent Depression", desc: "Lack of specific public mental health support for men facing systematic extortion & litigation." },
    { value: "Zero", label: "State Shelter Houses for Abused Males", desc: "No local state-operated or state-sponsored emergency housing available for men escaping domestic trauma." }
  ];

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-gray-200 flex flex-col font-sans selection:bg-[#ff0055] selection:text-white">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none z-0" />

      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#141414]/90 border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleScrollTo("hero")}>
            <div className="w-10 h-10 rounded bg-gradient-to-br from-[#ff0055] to-[#990000] flex items-center justify-center shadow-[0_0_15px_rgba(255,0,85,0.4)] border border-white/10">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-white leading-none whitespace-nowrap">
                MRB PLATFORM
              </h1>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                Men&apos;s Rights Bangladesh
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-gray-400">
            <button onClick={() => { setActiveTab("HOME"); handleScrollTo("hero"); }} className={`hover:text-white transition py-1 ${activeTab === "HOME" ? "text-white border-b-2 border-[#ff0055]" : ""}`}>Home</button>
            <button onClick={() => { setActiveTab("ABOUT"); handleScrollTo("about"); }} className={`hover:text-white transition py-1 ${activeTab === "ABOUT" ? "text-white border-b-2 border-[#ff0055]" : ""}`}>About Us</button>
            <button onClick={() => { setActiveTab("SITUATION"); handleScrollTo("situation"); }} className={`hover:text-white transition py-1 ${activeTab === "SITUATION" ? "text-white border-b-2 border-[#ff0055]" : ""}`}>Situation</button>
            <button onClick={() => { setActiveTab("DIRECTORY"); handleScrollTo("crime-directory"); }} className={`hover:text-white transition py-1 ${activeTab === "DIRECTORY" ? "text-white border-b-2 border-[#ff0055]" : ""}`}>Directory</button>
            <button onClick={() => { setActiveTab("TRACKER"); handleScrollTo("propaganda"); }} className={`hover:text-white transition py-1 ${activeTab === "TRACKER" ? "text-white border-b-2 border-[#ff0055]" : ""}`}>Tracker</button>
            <button onClick={() => handleScrollTo("report-abuse")} className="hover:text-white transition py-1">Report Abuse</button>
            <button onClick={() => handleScrollTo("donate")} className="hover:text-[#ff0055] text-red-400 transition py-1">Donate</button>
            <button onClick={() => handleScrollTo("contact")} className="hover:text-white transition py-1">Contact</button>
          </nav>

          {/* Action CTA desktop */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleScrollTo("report-abuse")}
              className="px-5 py-2.5 rounded bg-gradient-to-r from-[#ff0055] to-[#990000] text-white text-xs font-bold uppercase tracking-wider shadow-[0_4px_15px_rgba(255,0,85,0.3)] active:scale-95 transition-transform cursor-pointer"
            >
              Get Help Now
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden p-2 text-gray-400 hover:text-white transition"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#141414] border-b border-white/10 py-4 px-4 space-y-4 animate-fade-in">
            <nav className="flex flex-col gap-3 text-xs font-bold uppercase tracking-wider text-gray-400">
              <button onClick={() => handleScrollTo("hero")} className="text-left py-2 hover:text-white transition">Home</button>
              <button onClick={() => handleScrollTo("about")} className="text-left py-2 hover:text-white transition">About Us</button>
              <button onClick={() => handleScrollTo("situation")} className="text-left py-2 hover:text-white transition">Situation</button>
              <button onClick={() => handleScrollTo("crime-directory")} className="text-left py-2 text-[#ff0055] hover:text-white transition">Crime Directory</button>
              <button onClick={() => handleScrollTo("propaganda")} className="text-left py-2 text-[#ff0055] hover:text-white transition">Propaganda Tracker</button>
              <button onClick={() => handleScrollTo("report-abuse")} className="text-left py-2 hover:text-white transition">Report Abuse</button>
              <button onClick={() => handleScrollTo("donate")} className="text-left py-2 text-[#ff0055] transition">Donate</button>
              <button onClick={() => handleScrollTo("contact")} className="text-left py-2 hover:text-white transition">Contact</button>
            </nav>
            <button
              onClick={() => handleScrollTo("report-abuse")}
              className="w-full bg-gradient-to-r from-[#ff0055] to-[#990000] text-white font-bold text-xs uppercase tracking-widest py-3 rounded shadow-[0_4px_15px_rgba(255,0,85,0.3)] transition text-center"
            >
              Get Help Now
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 z-10">
        
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-x-0 inset-y-0 h-full w-full">
          <Image 
            src="/src/assets/images/mens_rights_hero_1781804947472.jpg" 
            alt="Hero Background Grid Lines" 
            fill
            className="object-cover opacity-15 animate-pulse"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center space-y-8 z-20">
          <div className="absolute top-0 right-1/4 w-32 h-32 bg-[#ff0055]/10 blur-3xl rounded-full pointer-events-none"></div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff0055]/15 text-[#ff0055] border border-[#ff0055]/35 text-xs font-bold uppercase tracking-widest">
            <Scale className="w-4 h-4 text-[#ff0055] animate-pulse" />
            Justice knows no gender • সমতা ও নিরাপত্তা সবার অধিকার
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] max-w-5xl mx-auto">
            EQUALITY THROUGH <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0055] to-[#ff4d8d]">TRUTH &amp; JUSTICE</span>
          </h2>

          <p className="text-sm sm:text-base max-w-3xl mx-auto text-gray-400 leading-relaxed font-sans">
            Bangladesh lacks balanced laws to protect men from fraudulent litigative torture, child alienation, extortion under threats of false rape filings, and extreme domestic abuse. We provide legal education, verified documentation tracker systems, and psychiatric support referral.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <button
              onClick={() => handleScrollTo("report-abuse")}
              className="w-full sm:w-auto bg-gradient-to-r from-[#ff0055] to-[#990000] hover:opacity-90 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl transition duration-200 shadow-xl shadow-[#ff0055]/20 cursor-pointer"
            >
              Report an Abuse case
            </button>
            <button
              onClick={() => handleScrollTo("crime-directory")}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl transition border border-white/15 cursor-pointer"
            >
              Read Crime Directory
            </button>
          </div>
        </div>
      </section>

      {/* About Us & What We Do */}
      <section id="about" className="py-24 bg-[#0d0d0d] border-t border-white/10 relative">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#ff0055]/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Header Content & Mission */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#ff0055]">
                Who We Are &amp; What We Advocate For
              </span>
              <h3 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
                Our Mission for Equitable Justice in Bangladesh
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed font-sans">
                For decades, humanitarian frameworks have evolved focusing on protecting vulnerable populations. However, legal imbalance has paved the way for massive loopholes, causing men in Bangladesh to be targeted with fabricated charges, child alienation, and systemic financial destruction under asymmetric laws.
              </p>
              <div className="p-5 rounded border border-white/10 bg-[#141414] space-y-3">
                <blockquote className="text-sm font-semibold italic text-gray-300">
                  &ldquo;Guilty until proven innocent&rdquo; has become the standard mechanism when false lawsuits are used to seize assets or property.
                </blockquote>
                <p className="text-xs text-[#ff0055] font-bold uppercase tracking-wider">
                  — Dignity Bangladesh legal desk
                </p>
              </div>
            </div>

            {/* Core Columns / Pillars */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="p-6 bg-[#1a1a1a]/55 border border-white/5 rounded-2xl space-y-4 hover:border-[#ff0055]/40 backdrop-blur-md transition duration-300">
                <div className="w-10 h-10 rounded bg-[#ff0055]/10 flex items-center justify-center">
                  <Scale className="w-5 h-5 text-[#ff0055]" />
                </div>
                <h4 className="text-base font-bold text-gray-200">Legal Equality Advocacy</h4>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  Lobbying for changes to the Nari O Shishu Act &amp; Section 11c of the Dowry Prohibition Act to require rigorous verification of evidence before arrests can happen.
                </p>
              </div>

              <div className="p-6 bg-[#1a1a1a]/55 border border-white/5 rounded-2xl space-y-4 hover:border-[#ff0055]/40 backdrop-blur-md transition duration-300">
                <div className="w-10 h-10 rounded bg-[#ff0055]/10 flex items-center justify-center">
                  <MessageSquareWarning className="w-5 h-5 text-[#ff0055]" />
                </div>
                <h4 className="text-base font-bold text-gray-200">Propaganda Tracking</h4>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  Tracking malicious campaigns and online character assassination plots intended to blackmail husbands or fathers into giving up their custody rights.
                </p>
              </div>

              <div className="p-6 bg-[#1a1a1a]/55 border border-white/5 rounded-2xl space-y-4 hover:border-[#ff0055]/40 backdrop-blur-md transition duration-300">
                <div className="w-10 h-10 rounded bg-[#ff0055]/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#ff0055]" />
                </div>
                <h4 className="text-base font-bold text-gray-200">Therapist Referrals</h4>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  Connecting traumatized men with empathetic mental health practitioners who understand the specific stresses of false accusations and child alienation.
                </p>
              </div>

              <div className="p-6 bg-[#1a1a1a]/55 border border-white/5 rounded-2xl space-y-4 hover:border-[#ff0055]/40 backdrop-blur-md transition duration-300">
                <div className="w-10 h-10 rounded bg-[#ff0055]/10 flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5 text-[#ff0055]" />
                </div>
                <h4 className="text-base font-bold text-gray-200">Crisis Mediation desk</h4>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  Providing a secure portal to archive evidence, so victims have a structured database to defend their innocence in civil family court rooms.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Situation/Stats Section */}
      <section id="situation" className="py-24 bg-[#0d0d0d] border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#ff0055]">
              The Reality of Men&apos;s Rights in Bangladesh
            </span>
            <h3 className="text-3xl font-bold text-white tracking-tight">
              A Socio-Legal Crisis Demanding Attention
            </h3>
            <p className="text-sm text-gray-400 font-sans">
              Men facing extortion are forced into silence due to profound societal shame and laws that lack basic protections against perjury or false testimony.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div 
                key={idx}
                className="bg-[#141414] border border-white/5 rounded-2xl p-6 text-left space-y-4 hover:border-[#ff0055]/30 transition duration-200"
              >
                <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff0055] to-[#990000] font-mono">
                  {stat.value}
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
                    {stat.label}
                  </h4>
                  <p className="text-xs text-gray-400 font-sans leading-relaxed">
                    {stat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-[#ff0055]/5 border border-[#ff0055]/15 max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6 text-left">
            <AlertOctagon className="w-12 h-12 text-[#ff0055] shrink-0 animate-pulse" />
            <div>
              <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Section 211 of Penal Code 1860 is Underused</h4>
              <p className="text-xs text-gray-400 font-sans mt-1 leading-relaxed">
                Although filing transparently false criminal charges is a punishable offense under Section 211, magistrate courts in Bangladesh rarely prosecute complainants due to judicial bottlenecks, compounding the abuse of laws.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Crime Directory (Section 1) */}
      <section id="crime-directory" className="py-24 bg-[#0d0d0d] border-t border-white/10 relative">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff0055]/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#ff0055]">
                Section 1 • Crime Directory
              </span>
              <span className="text-xs text-gray-400 font-mono">
                / নারী কর্তৃক সংঘটিত অপরাধের তালিকা
              </span>
            </div>
            
            <h3 className="text-3xl font-bold text-white tracking-tight">
              Documented Cases of Crimes Against Men
            </h3>
            <p className="text-sm text-gray-400 max-w-3xl font-sans">
              A serious, verified listing of real family law and criminal justice cases where men were the primary victims of malicious litigation, physical injury, child isolation, or systemic extortion.
            </p>
          </div>

          <CrimeDirectory />

        </div>
      </section>

      {/* Propaganda & Defamation Tracker (Section 2) */}
      <section id="propaganda" className="py-24 bg-[#0d0d0d] border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#ff0055]">
                Section 2 • Web Tracker
              </span>
              <span className="text-xs text-gray-400 font-mono">
                / অপপ্রচার ও গুজব ট্র্যাকার
              </span>
            </div>
            
            <h3 className="text-3xl font-bold text-white tracking-tight">
              Fabricated Narratives &amp; Online Character Defamation
            </h3>
            <p className="text-sm text-gray-400 max-w-3xl font-sans">
              We catalog online extortion campaigns targetting specific men, including viral defamation campaigns on Facebook or TikTok designed to bypass official judicial channels.
            </p>
          </div>

          <PropagandaTracker />

        </div>
      </section>

      {/* Secure Crime Reporting Portal (Section 3) */}
      <section id="report-abuse" className="py-24 bg-[#0d0d0d] border-t border-white/10 relative">
        <div className="absolute inset-x-0 inset-y-0 bg-radial-at-t from-[#ff0055]/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 tracking-tight relative">
          
          <div className="text-center space-y-4 mb-12">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#ff0055]">
              Section 3 • Secure Portal
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Submit Secure Abuse Incident Report
            </h3>
            <p className="text-sm text-gray-400 max-w-2xl mx-auto font-sans">
              Are you a victim of systematic extortion, or are you facing threats of a fraudulent lawsuit? Submit the details to us. All assets, screenshots, and logs are encrypted and routed directly to our secure administrative office.
            </p>
          </div>

          {reportSuccessId ? (
            <div className="bg-[#141414] border border-white/10 p-8 rounded-3xl text-center space-y-6 animate-fade-in relative z-20">
              <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
              <div className="space-y-2">
                <h4 className="text-2xl font-bold text-white">Your Incident Report is Securely Dispatched</h4>
                <p className="text-sm text-gray-400 max-w-md mx-auto font-sans">
                  A ticket was generated, and your description along with all raw file uploads has been directly dispatched to our secure executive team.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black border border-white/10 inline-block">
                <span className="text-xs text-gray-500 uppercase font-mono block">Reference Ticket ID</span>
                <span className="text-lg font-mono font-bold text-[#ff0055] tracking-widest">{reportSuccessId}</span>
              </div>

              <div>
                <button
                  onClick={() => setReportSuccessId(null)}
                  className="bg-gradient-to-r from-[#ff0055] to-[#990000] hover:opacity-90 text-white text-xs uppercase font-bold tracking-widest px-6 py-3 rounded-lg transition shadow-lg shadow-[#ff0055]/10"
                >
                  Submit Another Case Report
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-[#141414]/90 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-sm relative overflow-hidden z-20">
              <SecureSubmitForm onSuccess={(id) => setReportSuccessId(id)} />
            </div>
          )}

        </div>
      </section>

      {/* Donation Channel Info */}
      <section id="donate" className="py-24 bg-[#0d0d0d] border-t border-white/10 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <BookOpen className="w-12 h-12 text-[#ff0055] mx-auto" />
          <h3 className="text-3xl font-bold text-white tracking-tight">Support Our Lobbying for Legal Reform</h3>
          <p className="text-sm text-gray-400 leading-relaxed font-sans">
            &ldquo;Dignity Bangladesh&rdquo; is funded 100% through individual donations. We utilize contributions to hire researchers, draft legislative bills proposing court-level pre-arrest evidence checks, and help pay for court filing fees for helpless, low-income victims.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-left">
            <div className="p-5 rounded-xl bg-[#1a1a1a]/55 border border-white/5 space-y-2">
              <span className="text-xs font-bold text-[#ff0055] uppercase tracking-widest font-mono">Bkash Personal</span>
              <p className="text-base font-extrabold text-white font-mono break-all select-all">+880 1712-441-233</p>
              <span className="text-[10px] text-gray-500 block">Reference: &ldquo;Men Rights BD&rdquo;</span>
            </div>

            <div className="p-5 rounded-xl bg-[#1a1a1a]/55 border border-white/5 space-y-2">
              <span className="text-xs font-bold text-[#ff0055] uppercase tracking-widest font-mono">Direct Bank Transfer</span>
              <p className="text-xs font-semibold text-white">East-West Bank PJSC, Dhaka</p>
              <p className="text-xs font-mono text-gray-300 font-bold tracking-wider select-all">A/C: 1022-3490-1288</p>
            </div>

            <div className="p-5 rounded-xl bg-[#1a1a1a]/55 border border-white/5 space-y-2">
              <span className="text-xs font-bold text-[#ff0055] uppercase tracking-widest font-mono">Crypto Wallets</span>
              <p className="text-xs text-gray-500">Fast Bitcoin Network Address:</p>
              <p className="text-xs font-mono text-gray-400 break-all select-all">bc1qxy2kg3ut78hxw886_fake_wallet</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer & Trust Badges */}
      <footer id="contact" className="bg-[#111111] border-t border-white/10 pt-20 pb-10 relative z-10 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/5">
            
            {/* Column 1 info */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-[#ff0055] to-[#990000] flex items-center justify-center shadow-[0_0_15px_rgba(255,0,85,0.4)]">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-xs font-bold tracking-widest uppercase text-white font-sans">MRB Organization</h4>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Dignity Bangladesh is a volunteer-led civil rights pressure group advocating for human rights, judicial balance, mental health support, and litigation accountability within the legal framework of the Republic of Bangladesh.
              </p>
            </div>

            {/* Column 2 Quick links */}
            <div className="md:col-span-3 space-y-4 text-xs">
              <h5 className="font-bold uppercase text-white tracking-widest text-[10px]">Resource Links</h5>
              <div className="flex flex-col gap-2 text-gray-400">
                <button onClick={() => handleScrollTo("about")} className="text-left hover:text-white transition">About Bangladesh Crisis</button>
                <button onClick={() => handleScrollTo("crime-directory")} className="text-left hover:text-[#ff0055] text-red-400 transition">Crime Database / নারী সংঘটিত অপরাধ</button>
                <button onClick={() => handleScrollTo("propaganda")} className="text-left hover:text-white transition">Guoub / Propaganda Tracker</button>
                <button onClick={() => handleScrollTo("report-abuse")} className="text-left hover:text-white transition">Secure Action Desk</button>
              </div>
            </div>

            {/* Column 3 contact */}
            <div className="md:col-span-5 space-y-4 text-xs">
              <h5 className="font-bold uppercase text-white tracking-widest text-[10px]">Administrative Contacts</h5>
              <div className="space-y-3 font-mono">
                <div className="flex items-center gap-3 text-gray-300 hover:text-white transition select-none">
                  <Mail className="w-4 h-4 text-[#ff0055]" />
                  <span>Secure Submission Routing Desk</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 hover:text-[#ff0055] transition cursor-pointer select-all">
                  <PhoneCall className="w-4 h-4 text-[#ff0055]" />
                  <span>+880 1712-441-233</span>
                </div>
                <div className="p-3 bg-black border border-white/5 rounded-lg text-[10px] text-gray-500 italic leading-snug">
                  🛡️ SSL Encrypted secure web router automatically filters incoming logs for legal compliance. Files are isolated from external browser access.
                </div>
              </div>
            </div>

          </div>

          <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] text-gray-500 font-sans tracking-wide">
              &copy; 2026 Dignity Bangladesh Human Rights Advocacy. All Rights Reserved. Designed under premium Dark &amp; Crimson specifications.
            </p>
            <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-wider text-gray-400">
              <span className="flex items-center gap-1.5"><Shield className="w-4.5 h-4.5 text-[#ff0055]" /> Verified Legal Resource</span>
              <span className="text-gray-700">|</span>
              <span className="flex items-center gap-1.5"><Award className="w-4.5 h-4.5 text-[#ff0055]" /> Secure SSL Channels</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
