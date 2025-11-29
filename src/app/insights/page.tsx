'use client';

import React from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';
// import { api } from '../../lib/api';

interface AIInsightsProps {
  darkMode: boolean;
  cardClass: string;
  analysis: any;
  loadData: () => void;
}

export function AIInsights({ darkMode, cardClass, analysis, loadData }: AIInsightsProps) {
  return (
    <div className="space-y-6">
      <div className={`${cardClass} border rounded-lg p-6`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Policy Risk Analysis</h3>
          <button onClick={loadData} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center gap-2">
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg">
            <p className="text-sm opacity-70 mb-2">High Risk</p>
            <p className="text-3xl font-bold text-red-500">{analysis?.summary.high || 0}</p>
          </div>
          <div className="p-4 bg-yellow-500/10 border border-yellow-500 rounded-lg">
            <p className="text-sm opacity-70 mb-2">Medium Risk</p>
            <p className="text-3xl font-bold text-yellow-500">{analysis?.summary.medium || 0}</p>
          </div>
          <div className="p-4 bg-green-500/10 border border-green-500 rounded-lg">
            <p className="text-sm opacity-70 mb-2">Low Risk</p>
            <p className="text-3xl font-bold text-green-500">{analysis?.summary.low || 0}</p>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="font-semibold text-lg">Detected Issues</h4>
          {analysis?.risks.map((risk: any) => (
            <div key={risk.id} className={`p-4 rounded-lg border ${
              risk.severity === 'high' ? 'bg-red-500/10 border-red-500' :
              risk.severity === 'medium' ? 'bg-yellow-500/10 border-yellow-500' :
              'bg-green-500/10 border-green-500'
            }`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <AlertTriangle className={
                    risk.severity === 'high' ? 'text-red-500' :
                    risk.severity === 'medium' ? 'text-yellow-500' :
                    'text-green-500'
                  } size={24} />
                  <div>
                    <p className="font-medium">{risk.message}</p>
                    <p className="text-sm opacity-70">Line {risk.line}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  risk.severity === 'high' ? 'bg-red-500 text-white' :
                  risk.severity === 'medium' ? 'bg-yellow-500 text-white' :
                  'bg-green-500 text-white'
                }`}>
                  Score: {risk.score}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={`${cardClass} border rounded-lg p-6`}>
        <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>
        <div className="space-y-3">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <p className="font-medium mb-2">🔍 Reduce Wildcard Usage</p>
            <p className="text-sm opacity-70">5 policies use overly broad wildcards (*) - consider more specific paths.</p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <p className="font-medium mb-2">🎯 Implement Principle of Least Privilege</p>
            <p className="text-sm opacity-70">Review Guest role permissions - excessive delete access removed; enforce minimal grants only.</p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <p className="font-medium mb-2">⚠️ Resolve Policy Conflicts</p>
            <p className="text-sm opacity-70">Found 2 conflicting ALLOW/DENY rules for the same resources; prioritize DENY and audit overlaps.</p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <p className="font-medium mb-2">🔒 Audit Time-Based Rules</p>
            <p className="text-sm opacity-70">Ensure business hours (9-17) align with actual access patterns; add logging for violations.</p>
          </div>
        </div>
      </div>
    </div>
  );
}