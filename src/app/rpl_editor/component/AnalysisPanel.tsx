"use client";

import { useState } from "react";
import {
  X,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Save,
} from "lucide-react";

interface ApiMessage {
  errors?: Array<{
    message: string;
    line_number?: number;
    column_number?: number;
    error_code?: number;
  }>;
  findings?: Array<{
    id?: number;
    line?: number;
    risk_score?: number;
    description?: string;
    recommendation?: string;
    category?: string;
  }>;
  risk_score?: number;
  saved?: {
    roles?: any[];
    users?: any[];
    groups?: any[];
    resources?: Array<{
      name?: string;
      path?: string;
      id?: number;
      resource_type?: string;
    }>;
  };
}

interface AnalysisPanelProps {
  response?: { message?: ApiMessage } | null;
}

function severityColor(score?: number): string {
  if (typeof score !== "number") return "bg-gray-200 text-gray-800 border-gray-300";
  if (score >= 9) return "bg-red-600 text-red-50 border-red-700";
  if (score >= 7) return "bg-orange-500 text-orange-50 border-orange-600";
  if (score >= 5) return "bg-yellow-500 text-yellow-50 border-yellow-600";
  return "bg-green-500 text-green-50 border-green-600";
}

function severityLabel(score?: number): string {
  if (typeof score !== "number") return "Unknown";
  if (score >= 9) return "Critical";
  if (score >= 7) return "High";
  if (score >= 5) return "Medium";
  return "Low";
}

export default function AnalysisPanel({ response }: AnalysisPanelProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (!isVisible || !response?.message) return null;

  const msg = response.message;

  // ─────────────────────────────────────
  // 1. Validation Errors
  // ─────────────────────────────────────
  if (msg.errors && msg.errors.length > 0) {
    return (
      <div className="border rounded-xl bg-red-50 dark:bg-red-950/30 shadow-sm overflow-hidden flex flex-col h-[460px]">
        <div className="flex items-center justify-between bg-red-200 dark:bg-red-900 px-4 py-3 border-b border-red-300 dark:border-red-800">
          <div className="flex items-center gap-3 font-bold text-red-800 dark:text-red-200">
            <AlertCircle className="h-6 w-6" />
            <span>Validation Failed</span>
            <span className="text-sm font-mono bg-red-700 text-white px-3 py-1 rounded-full">
              {msg.errors.length} error{msg.errors.length !== 1 ? "s" : ""}
            </span>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-red-300 dark:hover:bg-red-800 rounded transition"
            aria-label="Close panel"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {msg.errors.map((err, idx) => {
            const hasLocation = err.line_number != null && err.line_number > 0;

            return (
              <div
                key={idx}
                className="rounded-lg border border-red-300 bg-white dark:bg-red-950/50 p-4 shadow-sm"
              >
                <p className="font-medium text-red-900 dark:text-red-300">{err.message}</p>

                {hasLocation && (
                  <p className="text-sm text-red-700 dark:text-red-400 mt-1 font-mono">
                    Line {err.line_number}
                    {err.column_number != null && err.column_number > 0 && `:${err.column_number}`}
                    {err.error_code != null && ` • Code ${err.error_code}`}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────
  // 2. LLM Security Findings
  // ─────────────────────────────────────
  if (msg.findings && msg.findings.length > 0) {
    const overallScore =
      msg.risk_score ?? Math.max(...msg.findings.map((f) => f.risk_score ?? 0));

    return (
      <div className="border rounded-xl bg-neutral-50 dark:bg-neutral-900 shadow-sm overflow-hidden flex flex-col h-[460px]">
        <div className="flex items-center justify-between bg-neutral-200 dark:bg-neutral-800 px-4 py-2 border-b">
          <div className="flex items-center gap-2 font-semibold">
            <ShieldAlert
              className={overallScore >= 8 ? "text-red-500" : "text-orange-500"}
              size={18}
            />
            <span>Security Analysis</span>
            <span
              className={`ml-2 text-xs px-2 py-1 rounded-full border font-bold ${
                overallScore >= 8
                  ? "bg-red-600 text-white"
                  : "bg-orange-500 text-white"
              }`}
            >
              Risk Score: {overallScore}/10
            </span>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-neutral-300 dark:hover:bg-neutral-700 rounded transition"
            aria-label="Close panel"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {msg.findings.map((finding, idx) => {
            const line = finding.line ?? "—";
            const score = finding.risk_score;

            return (
              <div
                key={idx}
                className="rounded-lg border bg-white dark:bg-neutral-950 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition text-left"
                  aria-expanded={expandedIndex === idx}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <AlertTriangle className="text-orange-500 flex-shrink-0" size={18} />
                    <span className="font-medium truncate">Line {line}</span>
                    {score != null && (
                      <span
                        className={`text-xs px-2 py-1 rounded-full border font-medium ${severityColor(
                          score
                        )}`}
                      >
                        {severityLabel(score)} ({score}/10)
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-neutral-500">
                    {expandedIndex === idx ? "▲" : "▼"}
                  </span>
                </button>

                {expandedIndex === idx && (
                  <div className="px-4 pb-4 pt-3 text-sm space-y-4 border-t border-neutral-200 dark:border-neutral-800">
                    <div>
                      <p className="font-semibold text-neutral-700 dark:text-neutral-300">
                        Description
                      </p>
                      <p className="text-neutral-600 dark:text-neutral-400 whitespace-pre-wrap mt-1">
                        {finding.description || "No description provided."}
                      </p>
                    </div>

                    {finding.recommendation && (
                      <div>
                        <p className="font-semibold text-green-700 dark:text-green-400">
                          Recommendation
                        </p>
                        <p className="text-neutral-600 dark:text-neutral-400 whitespace-pre-wrap mt-1">
                          {finding.recommendation}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────
  // 3. Successful Save
  // ─────────────────────────────────────
  if (msg.saved) {
    const { roles = [], users = [], groups = [], resources = [] } = msg.saved;
    const total = roles.length + users.length + groups.length + resources.length;

    return (
      <div className="border rounded-xl bg-green-50 dark:bg-green-950/30 shadow-sm overflow-hidden flex flex-col h-[460px]">
        <div className="flex items-center justify-between bg-green-200 dark:bg-green-900 px-4 py-3 border-b border-green-300 dark:border-green-800">
          <div className="flex items-center gap-3 font-bold text-green-800 dark:text-green-200">
            <CheckCircle2 className="h-6 w-6" />
            <span>Policy Saved Successfully</span>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-green-300 dark:hover:bg-green-800 rounded transition"
            aria-label="Close panel"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="text-center mb-8">
            <Save className="h-14 w-14 text-green-600 mx-auto mb-4" />
            <p className="text-2xl font-bold text-green-800 dark:text-green-200">
              {total} object{total !== 1 ? "s" : ""} saved
            </p>
          </div>

          {(resources.length > 0 || roles.length > 0 || users.length > 0 || groups.length > 0) ? (
            <div className="grid grid-cols-2 gap-4 text-sm">
              {resources.length > 0 && (
                <div className="bg-white dark:bg-green-950/50 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <p className="font-semibold text-green-700 dark:text-green-300">Resources</p>
                  <p className="text-2xl font-bold text-green-800 dark:text-green-200">{resources.length}</p>
                  <div className="mt-2 space-y-1">
                    {resources.map((r, i) => (
                      <p key={i} className="text-xs text-neutral-600 dark:text-neutral-400 truncate">
                        • {r.name || r.path || `Resource ${r.id}`}
                      </p>
                    ))}
                  </div>
                </div>
              )}
              {roles.length > 0 && (
                <div className="bg-white dark:bg-green-950/50 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <p className="font-semibold text-green-700 dark:text-green-300">Roles</p>
                  <p className="text-2xl font-bold text-green-800 dark:text-green-200">{roles.length}</p>
                </div>
              )}
              {users.length > 0 && (
                <div className="bg-white dark:bg-green-950/50 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <p className="font-semibold text-green-700 dark:text-green-300">Users</p>
                  <p className="text-2xl font-bold text-green-800 dark:text-green-200">{users.length}</p>
                </div>
              )}
              {groups.length > 0 && (
                <div className="bg-white dark:bg-green-950/50 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <p className="font-semibold text-green-700 dark:text-green-300">Groups</p>
                  <p className="text-2xl font-bold text-green-800 dark:text-green-200">{groups.length}</p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-center text-green-700 dark:text-green-400 italic">
              Policy updated (no new objects created)
            </p>
          )}
        </div>
      </div>
    );
  }

  // No meaningful content
  return null;
}