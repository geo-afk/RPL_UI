'use client';

import toast from 'react-hot-toast';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface AIInsightsProps {
  darkMode: boolean;
  cardClass: string;
}

interface Findings {
  line: number;
  risk_score: number;
  category: string;
  description: string;
  recommendation: string;
  raw_output?: string;
}

type SeverityLevel = 'high' | 'medium' | 'low';

const getSeverityFromScore = (score: number): SeverityLevel => {
  if (score >= 80) return 'high';
  if (score >= 50) return 'medium';
  return 'low';
};

const getSeverityColors = (severity: SeverityLevel) => {
  switch (severity) {
    case 'high':
      return {
        bg: 'bg-red-500/10',
        border: 'border-red-500',
        text: 'text-red-500',
        badge: 'bg-red-500 text-white',
      };
    case 'medium':
      return {
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500',
        text: 'text-yellow-500',
        badge: 'bg-yellow-500 text-white',
      };
    case 'low':
      return {
        bg: 'bg-green-500/10',
        border: 'border-green-500',
        text: 'text-green-500',
        badge: 'bg-green-500 text-white',
      };
  }
};

export function AIInsights({ darkMode, cardClass }: AIInsightsProps) {
  const [findings, setFindings] = useState<Findings[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadFindings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get_llm_findings();
      setFindings(data || []);
    } catch (err: any) {
      console.error('Failed to fetch LLM findings:', err);
      setError('Failed to load policy analysis');
      toast.error('Failed to load AI insights', { id: 'ai-insights' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFindings();
  }, [loadFindings]);

  // Calculate summary counts
  const summary = findings
    ? {
        high: findings.filter(f => getSeverityFromScore(f.risk_score) === 'high').length,
        medium: findings.filter(f => getSeverityFromScore(f.risk_score) === 'medium').length,
        low: findings.filter(f => getSeverityFromScore(f.risk_score) === 'low').length,
      }
    : { high: 0, medium: 0, low: 0 };

  return (
    <div className="space-y-6">
      {/* Risk Summary Card */}
      <div className={`${cardClass} border rounded-lg p-6`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Policy Risk Analysis</h3>
          <button
            onClick={loadFindings}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg flex items-center gap-2 transition-colors"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg">
            <p className="text-sm opacity-70 mb-2">High Risk</p>
            <p className="text-3xl font-bold text-red-500">{summary.high}</p>
          </div>
          <div className="p-4 bg-yellow-500/10 border border-yellow-500 rounded-lg">
            <p className="text-sm opacity-70 mb-2">Medium Risk</p>
            <p className="text-3xl font-bold text-yellow-500">{summary.medium}</p>
          </div>
          <div className="p-4 bg-green-500/10 border border-green-500 rounded-lg">
            <p className="text-sm opacity-70 mb-2">Low Risk</p>
            <p className="text-3xl font-bold text-green-500">{summary.low}</p>
          </div>
        </div>

        {/* Detected Issues List */}
        <div className="space-y-4">
          <h4 className="font-semibold text-lg">Detected Issues</h4>

          {loading && (
            <div className="text-center py-8 text-muted-foreground">
              Loading AI analysis...
            </div>
          )}

          {error && (
            <div className="text-center py-8 text-red-500">
              {error}
            </div>
          )}

          {!loading && !error && findings && findings.length === 0 && (
            <div className="text-center py-8 opacity-70">
              No issues detected. Your policy looks clean!
            </div>
          )}

          {!loading && !error && findings && findings.length > 0 && (
            <div className="space-y-3">
              {findings.map((finding, index) => {
                const severity = getSeverityFromScore(finding.risk_score);
                const colors = getSeverityColors(severity);

                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${colors.bg} ${colors.border}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <AlertTriangle className={`${colors.text}`} size={24} />
                        <div className="space-y-1">
                          <p className="font-medium">{finding.description}</p>
                          <div className="text-sm opacity-70 space-y-1">
                            <p>Line {finding.line}</p>
                            <p className="capitalize">Category: {finding.category}</p>
                          </div>
                          {finding.recommendation && (
                            <p className="text-sm mt-2 font-medium text-foreground">
                              Recommendation: {finding.recommendation}
                            </p>
                          )}
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${colors.badge}`}
                      >
                        Score: {finding.risk_score}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Optional: AI Recommendations (you can enhance this later with actual data) */}
      <div className={`${cardClass} border rounded-lg p-6`}>
        <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>
        <div className="text-sm opacity-70 italic text-center">
          Detailed recommendations will appear here once analysis is complete.
        </div>
      </div>
    </div>
  );
}