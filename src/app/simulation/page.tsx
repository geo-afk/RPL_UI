'use client';

import { useState } from 'react';
import { Play, RefreshCw, CheckCircle, XCircle } from 'lucide-react';

interface SimulationProps {
  darkMode: boolean;
  cardClass: string;
  inputClass: string;
  users: any[];
  resources: any[];
  simulateAccess: (user: string, resource: string, action: string) => Promise<any>;
  loading: boolean;
}

export function Simulation({ darkMode, cardClass, inputClass, users, resources, simulateAccess, loading }: SimulationProps) {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedResource, setSelectedResource] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [result, setResult] = useState<any>(null);

  const runSimulation = async () => {
    if (selectedUser && selectedResource && selectedAction) {
      const res = await simulateAccess(selectedUser, selectedResource, selectedAction);
      setResult(res);
    }
  };

  return (
    <div className="space-y-6">
      <div className={`${cardClass} border rounded-lg p-6`}>
        <h3 className="text-lg font-semibold mb-4">Configure Simulation</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <select value={selectedUser} onChange={e => setSelectedUser(e.target.value)} className={`px-4 py-2 rounded-lg border ${inputClass}`}>
            <option value="">Select User</option>
            {users.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
          </select>
          <select value={selectedResource} onChange={e => setSelectedResource(e.target.value)} className={`px-4 py-2 rounded-lg border ${inputClass}`}>
            <option value="">Select Resource</option>
            {resources.map(r => <option key={r.id} value={r.path}>{r.path}</option>)}
          </select>
          <select value={selectedAction} onChange={e => setSelectedAction(e.target.value)} className={`px-4 py-2 rounded-lg border ${inputClass}`}>
            <option value="">Select Action</option>
            <option value="read">Read</option>
            <option value="write">Write</option>
            <option value="delete">Delete</option>
          </select>
          <button
            onClick={runSimulation}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? <RefreshCw className="animate-spin" size={20} /> : <Play size={20} />}
            Simulate
          </button>
        </div>
        {result && (
          <div className={`p-6 rounded-lg ${result.allowed ? 'bg-green-500/10 border border-green-500' : 'bg-red-500/10 border border-red-500'}`}>
            <div className="flex items-center gap-3 mb-4">
              {result.allowed ? <CheckCircle className="text-green-500" size={32} /> : <XCircle className="text-red-500" size={32} />}
              <div>
                <h4 className="text-xl font-bold">{result.allowed ? 'Access Granted' : 'Access Denied'}</h4>
                <p className="opacity-70">{result.rule}</p>
              </div>
            </div>
            <div className="mt-4">
              <h5 className="font-semibold mb-2">Evaluation Trace:</h5>
              <div className="space-y-2">
                {result.trace.map((step: any) => (
                  <div key={step.step} className={`p-3 rounded ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <span className="font-medium">Step {step.step}:</span> {step.action} → {step.result}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm">Risk Score: <span className="font-bold">{result.riskScore}/100</span></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}