"use client";

import type React from "react";

import { useRef } from "react";
import { ArrowLeft } from "lucide-react";
import Icon from "./Icon";
import { Button } from "../ui/button";

export default function TwoFactorAuth({
  onLogin,
  code,
  setCode,
}: {
  onLogin: () => void;
  code: string[];
  setCode: React.Dispatch<React.SetStateAction<string[]>>;
}) {
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
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-center relative p-6">
        <button className="absolute top-2 left-6 p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <Icon />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4 text-balance">
            Two-Factor Authentication
          </h1>

          <p className="text-foreground mb-12 text-lg leading-relaxed">
            Enter the 6-digit code from the Google Authenticator app
          </p>

          {/* Code Input */}
          <div className="flex gap-3 justify-center mb-8">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-14 h-16 text-center text-2xl font-semibold border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all bg-white"
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>
          {code.join("").length === 6 && (
            <Button
              className="w-full h-10 mt-2 bg-primary hover:bg-primary/80 text-white font-medium cursor-pointer"
              variant="secondary"
              onClick={onLogin}
            >
              Log in
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
