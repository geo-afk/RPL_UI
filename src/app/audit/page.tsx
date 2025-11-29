'use client';

import { useState, useMemo } from 'react';
import { Search, Users, Shield, Activity, AlertCircle, CheckCircle } from 'lucide-react';

interface AuditLog {
  id: string;
  timestamp: number;
  user: string;
  resource: string;
  action: string;
  result: 'allowed' | 'denied';
  reason: string;
}

// Reusable StatCard component (you probably already have this — included here for completeness)
function StatCard({
  icon: Icon,
  label,
  value,
  change,
  color,
  darkMode,
  cardClass,
}: {
  icon: any;
  label: string;
  value: string | number;
  change?: string;
  color: string;
  darkMode: boolean;
  cardClass: string;
}) {
  const colorClasses = {
    blue: 'bg-blue-500/10 text-blue-500',
    green: 'bg-green-500/10 text-green-500',
    red: 'bg-red-500/10 text-red-500',
    purple: 'bg-purple-500/10 text-purple-500',
    yellow: 'bg-yellow-500/10 text-yellow-500',
  };

  return (
    <div className={`${cardClass} border rounded-xl p-5`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-70">{label}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {change && <p className="text-xs mt-1 opacity-70">{change}</p>}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}

interface AuditLogsProps {
  darkMode: boolean;
  cardClass: string;
  inputClass: string;
}

export function AuditLogs({ darkMode, cardClass, inputClass }: AuditLogsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterResult, setFilterResult] = useState('all');

  // Temporary test data
  const tempAuditLogs: AuditLog[] = [
    { id: '1', timestamp: Date.now() - 1000 * 60 * 5, user: 'alice.johnson@example.com', resource: '/api/v1/secrets/production-db', action: 'read', result: 'allowed', reason: 'Role: admin' },
    { id: '2', timestamp: Date.now() - 1000 * 60 * 12, user: 'bob.smith@example.com', resource: '/api/v1/users/12345', action: 'update', result: 'denied', reason: 'User can only modify own profile' },
    { id: '3', timestamp: Date.now() - 1000 * 60 * 30, user: 'charlie.brown@example.com', resource: '/dashboard/analytics', action: 'view', result: 'allowed', reason: 'Role: analyst' },
    { id: '4', timestamp: Date.now() - 1000 * 60 * 45, user: 'diana.prince@example.com', resource: '/api/v1/billing/invoices', action: 'create', result: 'allowed', reason: 'Role: finance' },
    { id: '5', timestamp: Date.now() - 1000 * 60 * 60, user: 'eve.adams@example.com', resource: '/api/v1/secrets/production-db', action: 'read', result: 'denied', reason: 'Insufficient clearance level' },
    { id: '6', timestamp: Date.now() - 1000 * 60 * 60 * 2, user: 'frank.miller@example.com', resource: '/admin/users', action: 'delete', result: 'denied', reason: 'MFA required' },
    { id: '7', timestamp: Date.now() - 1000 * 60 * 60 * 3, user: 'grace.hopper@example.com', resource: '/api/v1/deploy', action: 'execute', result: 'allowed', reason: 'Approved deployment' },
    { id: '8', timestamp: Date.now() - 1000 * 60 * 60 * 4, user: 'hank.green@example.com', resource: '/logs/system', action: 'read', result: 'allowed', reason: 'Role: sre' },
    { id: '9', timestamp: Date.now() - 1000 * 60 * 8, user: 'alice.johnson@example.com', resource: '/api/v1/config', action: 'update', result: 'allowed', reason: 'Role: admin' },
    { id: '10', timestamp: Date.now() - 1000 * 60 * 20, user: 'bob.smith@example.com', resource: '/api/v1/users/67890', action: 'read', result: 'allowed', reason: 'Own profile access' },
  ];

  const auditLogs = tempAuditLogs;

  // Compute stats
  const stats = useMemo(() => {
    const total = auditLogs.length;
    const allowed = auditLogs.filter(l => l.result === 'allowed').length;
    const denied = auditLogs.filter(l => l.result === 'denied').length;
    const uniqueUsers = new Set(auditLogs.map(l => l.user)).size;
    const uniqueResources = new Set(auditLogs.map(l => l.resource)).size;

    const allowedRate = total > 0 ? Math.round((allowed / total) * 100) : 0;

    return { total, allowed, denied, uniqueUsers, uniqueResources, allowedRate };
  }, [auditLogs]);

  const filtered = auditLogs.filter((log) =>
    (filterResult === 'all' || log.result === filterResult) &&
    (log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
     log.resource.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
  <div className="space-y-8">
    {/* Enhanced Stats Grid */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      <StatCard icon={Activity} label="Total Requests" value={stats.total} color="blue" darkMode={darkMode} cardClass={cardClass} />
      <StatCard icon={CheckCircle} label="Allowed" value={stats.allowed} change={`${stats.allowedRate}%`} color="green" darkMode={darkMode} cardClass={cardClass} />
      <StatCard icon={AlertCircle} label="Denied" value={stats.denied} change={`${100 - stats.allowedRate}%`} color="red" darkMode={darkMode} cardClass={cardClass} />
      <StatCard icon={Users} label="Active Users" value={stats.uniqueUsers} color="purple" darkMode={darkMode} cardClass={cardClass} />
      <StatCard 
        icon={Shield} 
        label="Success Rate" 
        value={`${stats.allowedRate}%`} 
        color={stats.allowedRate >= 90 ? 'green' : stats.allowedRate >= 70 ? 'yellow' : 'red'} 
        darkMode={darkMode} 
        cardClass={cardClass} 
      />
    </div>

    {/* Recent Activity + Quick Summary */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Recent Activity */}
      <div className={`${cardClass} border rounded-xl p-6 md:col-span-2`}>
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {auditLogs.slice(0, 6).map((log) => (
            <div key={log.id} className="flex items-center gap-3 text-sm">
              <div className={`w-2 h-2 rounded-full ${log.result === 'allowed' ? 'bg-green-500' : 'bg-red-500'}`} />
              <div className="flex-1">
                <span className="font-medium">{log.user.split('@')[0]}</span>
                <span className="opacity-70"> {log.action}d </span>
                <span className="font-mono text-xs opacity-60">{log.resource.split('/').pop()}</span>
              </div>
              <div className="text-xs opacity-60">
                {new Date(log.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Summary - Fixed & Clean */}
      <div className={`${cardClass} border rounded-xl p-6`}>
        <h3 className="text-lg font-semibold mb-4">Quick Summary</h3>
        <div className="space-y-4 text-sm">
          {/* Most Active User */}
          <div className="flex justify-between">
            <span className="opacity-70">Most Active User</span>
            <span className="font-medium">
              {(() => {
                const counts = auditLogs.reduce((acc, log) => {
                  acc[log.user] = (acc[log.user] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>);
                const topUser = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
                return topUser ? topUser[0].split('@')[0] : 'N/A';
              })()}
            </span>
          </div>

          {/* Top Resource */}
          <div className="flex justify-between">
            <span className="opacity-70">Top Resource</span>
            <span className="font-medium font-mono text-xs">
              {(() => {
                const counts = auditLogs.reduce((acc, log) => {
                  acc[log.resource] = (acc[log.resource] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>);
                const topResource = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
                return topResource ? topResource[0].split('/').pop() : 'N/A';
              })()}
            </span>
          </div>

          {/* Security Posture */}
          <div className="pt-3 border-t dark:border-gray-700">
            <div className="flex justify-between font-medium">
              <span>Security Posture</span>
              <span className={
                stats.allowedRate >= 85 ? 'text-green-500' : 
                stats.allowedRate >= 65 ? 'text-yellow-500' : 
                'text-red-500'
              }>
                {stats.allowedRate >= 85 ? 'Excellent' : 
                 stats.allowedRate >= 65 ? 'Good' : 
                 'Needs Review'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Audit Log Table - unchanged */}
    <div className={`${cardClass} border rounded-lg p-6`}>
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={20} />
          <input
            type="text"
            placeholder="Search by user or resource..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 px-4 py-2 rounded-lg border ${inputClass}`}
          />
        </div>
        <select
          value={filterResult}
          onChange={(e) => setFilterResult(e.target.value)}
          className={`px-4 py-2 rounded-lg border ${inputClass}`}
        >
          <option value="all">All Results</option>
          <option value="allowed">Allowed</option>
          <option value="denied">Denied</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <th className="text-left py-3 px-4">Time</th>
              <th className="text-left py-3 px-4">User</th>
              <th className="text-left py-3 px-4">Resource</th>
              <th className="text-left py-3 px-4">Action</th>
              <th className="text-left py-3 px-4">Result</th>
              <th className="text-left py-3 px-4">Reason</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-gray-500">
                  No logs match your filters
                </td>
              </tr>
            ) : (
              filtered.map((log) => (
                <tr key={log.id} className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                  <td className="py-3 px-4">
                    {new Date(log.timestamp).toLocaleString([], { 
                      hour: '2-digit', 
                      minute: '2-digit', 
                      second: '2-digit' 
                    })}
                  </td>
                  <td className="py-3 px-4 font-medium">{log.user}</td>
                  <td className="py-3 px-4 font-mono text-xs">{log.resource}</td>
                  <td className="py-3 px-4 capitalize">{log.action}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      log.result === 'allowed'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {log.result.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm opacity-75">{log.reason}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

  }