"use client";

import type React from "react";

import { useState, useRef } from "react";
import { ArrowLeft } from "lucide-react";

export default function TwoFactorAuth() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newCode = [...code];

    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newCode[i] = pastedData[i];
      }
    }

    setCode(newCode);

    // Focus the next empty input or the last input
    const nextEmptyIndex = newCode.findIndex((digit) => digit === "");
    const focusIndex = nextEmptyIndex === -1 ? 5 : Math.min(nextEmptyIndex, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-center relative p-6">
        <button className="absolute left-6 p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <span className="text-xl font-medium text-gray-900">Company</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 -mt-20">
        <div className="w-full max-w-md text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-balance">
            Two-Factor Authentication
          </h1>

          <p className="text-gray-600 mb-12 text-lg leading-relaxed">
            Enter the 6-digit code from the Google Authenticator app
          </p>

          {/* Code Input */}
          <div className="flex gap-3 justify-center mb-8">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-14 h-14 text-center text-xl font-semibold border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all bg-white"
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
