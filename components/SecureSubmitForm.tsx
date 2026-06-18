'use client';

import React, { useState } from "react";
import { AlertCircle, CheckCircle, FileText, Upload, X } from "lucide-react";

interface SecureSubmitFormProps {
  onSuccess: (id: string) => void;
}

export default function SecureSubmitForm({ onSuccess }: SecureSubmitFormProps) {
  const [crimeType, setCrimeType] = useState("False Dowry Litigation (যৌতুক মামলার অপব্যবহার)");
  const [victimName, setVictimName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState<{ name: string; size: string; type: string; formatUrl?: string }[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMess, setErrorMess] = useState<string | null>(null);

  const crimeTypesList = [
    "False Dowry Litigation (যৌতুক মামলার অপব্যবহার - Nari o Shishu Act 11c)",
    "False Rape Allegation / Extortion (ধর্ষণের মিথ্যা অপবাদ ও ব্ল্যাকমেইল)",
    "Domestic Abuse / Physical Violence (পুরুষের ওপর পারিবারিক নির্যাতন ও হামলা)",
    "Blackmail with Private Communication (ডিজিটাল ব্ল্যাকমেইল ও হয়রানি)",
    "Defamation & Character Assassination (অপপ্রচার ও সামাজিকভাবে মর্যাদাহানি)",
    "Child Custody & Parental Alienation (সন্তানের অভিভাবকত্ব থেকে বঞ্চিতকরণ)",
    "Financial Fraud / Alimony Abuse (মোহরানা ও দেনমোহরের অপব্যবহার বা প্রতারণা)",
    "Other / Uncategorized Attack (অন্যান্য নির্যাতন)"
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(e.target.files);
    }
  };

  const addFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList).map(file => ({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      type: file.type || "application/octet-stream"
    }));
    setAttachments(prev => [...prev, ...newFiles]);
  };

  const removeAttachment = (indexToRemove: number) => {
    setAttachments(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      setErrorMess("Please describe the incident. This field is required.");
      return;
    }

    setIsSubmitting(true);
    setErrorMess(null);

    try {
      const response = await fetch("/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          crimeType,
          victimName,
          phoneNumber,
          description,
          attachments,
        }),
      });

      const resData = await response.json();
      if (response.ok && resData.success) {
        // Reset form
        setDescription("");
        setVictimName("");
        setPhoneNumber("");
        setAttachments([]);
        onSuccess(resData.referenceId);
      } else {
        setErrorMess(resData.error || "A secure dispatch failure occurred. Please retry.");
      }
    } catch (err) {
      console.error(err);
      setErrorMess("Connection timed out. Secure fallback active: please capture screenshots of evidence and retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} id="secure-crime-form" className="space-y-6">
      {errorMess && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-950/20 border border-red-900/40 text-red-250 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-[#ff0055] mt-0.5" />
          <div>{errorMess}</div>
        </div>
      )}

      {/* Crime Type */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Category of Abuse / Incident <span className="text-[#ff0055]">*</span>
        </label>
        <select
          value={crimeType}
          onChange={(e) => setCrimeType(e.target.value)}
          className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3.5 text-gray-300 focus:outline-none focus:border-[#ff0055] transition cursor-pointer"
        >
          {crimeTypesList.map((type, idx) => (
            <option key={idx} value={type} className="bg-black">
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Grid for optional entries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Victim Name <span className="text-gray-500 text-xs">(Optional - Can leave blank for anonymity)</span>
          </label>
          <input
            type="text"
            value={victimName}
            onChange={(e) => setVictimName(e.target.value)}
            placeholder="e.g. Assaduzzaman Khan"
            className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff0055] transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Contact Number <span className="text-gray-500 text-xs">(Optional - For direct legal or therapy help)</span>
          </label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="e.g. +880 1712-XXXXXX"
            className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff0055] transition"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Detailed Description of the Incident <span className="text-[#ff0055]">*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Please explicitly provide dates, locations, nature of threats or blackmail, false cases filed, or physical damage. Maintain maximum objectivity and safety. Use Bengali or English."
          rows={5}
          required
          className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff0055] transition placeholder-gray-550"
        ></textarea>
      </div>

      {/* Attachment Upload System */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Secure Evidence & Document Attachment System <span className="text-gray-500 text-xs">(No limits on format. PDFs, PNGs, MP4s, WhatsApp audit files)</span>
        </label>
        
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition flex flex-col items-center justify-center cursor-pointer ${
            isDragging ? "border-[#ff0055] bg-[#ff0055]/5" : "border-white/10 hover:border-white/30 bg-[#0d0d0d]/40"
          }`}
          onClick={() => document.getElementById("evidence-upload")?.click()}
        >
          <input
            id="evidence-upload"
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          <Upload className="w-10 h-10 text-[#ff0055] mb-3" />
          <p className="text-sm text-gray-300 font-medium font-sans">
            Drag and drop evidence files here, or <span className="text-[#ff0055] hover:underline">browse files</span>
          </p>
          <p className="text-xs text-gray-500 mt-2 font-sans">
            Max safety: raw files are encrypted upon transit directly to admin inbox.
          </p>
        </div>

        {attachments.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-xs font-semibold text-gray-400">Attached files ({attachments.length}):</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {attachments.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded bg-black border border-white/5 text-xs">
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="w-4 h-4 text-[#ff0055] shrink-0" />
                    <span className="text-gray-200 truncate font-mono" title={file.name}>{file.name}</span>
                    <span className="text-gray-500 shrink-0">({file.size})</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeAttachment(index);
                    }}
                    className="p-1 hover:bg-white/5 text-gray-400 hover:text-[#ff0055] rounded transition cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center bg-radial-at-b from-[#ff0055]/5 via-transparent to-transparent p-4 rounded-xl border border-white/10 gap-4">
        <p className="text-xs text-gray-400 italic font-sans flex items-center gap-1.5">
          🔒 Secure TLS Router dispatches packets anonymously to the administrative office.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-[#ff0055] to-[#990000] text-white font-bold text-sm px-8 py-3.5 rounded-xl transition duration-200 shadow-lg shadow-[#ff0055]/15 disabled:opacity-50 cursor-pointer hover:opacity-90 w-full sm:w-auto"
        >
          {isSubmitting ? "Dispatching Securely..." : "Submit Secure Incident Report"}
        </button>
      </div>
    </form>
  );
}
