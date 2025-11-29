"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { PolicyResponse } from "../extra/types";

interface AnalysisPanelProps {
  response: PolicyResponse; // array of messages
}

export default function AnalysisPanel({ response }: AnalysisPanelProps) {
  const [analysisVisible, setAnalysisVisible] = useState(true);

  if (!analysisVisible) return null;

  return (
    <div
      className="border rounded-lg bg-gray-50 dark:bg-gray-900 overflow-hidden flex flex-col"
      style={{ height: 200 }}
    >
      <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-800 p-2 border-b cursor-ns-resize">
        <span className="font-medium">Analysis Output</span>
        <div className="flex gap-2">
          <button
            onClick={() => setAnalysisVisible(false)}
            className="p-1 hover:bg-gray-300 dark:hover:bg-gray-700 rounded"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div
        className="flex-1 overflow-auto p-2 text-sm font-mono bg-gray-50 dark:bg-gray-900"
        style={{ resize: "vertical" }}
      >
        {!response || Object.keys(response.message).length === 0 ? (
          <p className="opacity-50">No analysis messages yet.</p>
        ) : (
            Object.entries(response.message).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {String(value)}
              </p>
            ))
        )}

      </div>
    </div>
  );
}
