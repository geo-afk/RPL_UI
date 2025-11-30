'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import {
  Shield,
  ShieldCheck,
  ShieldOff,
  RefreshCw,
  Clock,
  Users,
  Lock,
  Search,
  User,
  ChevronDown,
  X,
} from 'lucide-react';

interface SimulationProps {
  darkMode: boolean;
  cardClass: string;
  inputClass: string;
}

// ──────────────────────────────────────────────────────────────
// Mock data control
// ──────────────────────────────────────────────────────────────
const USE_MOCK_DATA = true;

const MOCK_USERNAMES = [
  'alice.johnson',
  'bob.smith',
  'carol.williams',
  'dave.brown',
  'eve.davis',
  'admin',
  'security-analyst',
  'guest-user',
];

interface Simulation {
  user_roles: string[];
  permissions: string[];
  valid_until?: string | Date | null;
}

const MOCK_SIMULATIONS: Record<string, Simulation> = {
  'alice.johnson': {
    user_roles: ['admin', 'billing-manager'],
    permissions: ['users:*', 'billing:*', 'reports:export', 'settings:configure'],
    valid_until: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(),
  },
  'bob.smith': {
    user_roles: ['security-analyst', 'eu-data-processor'],
    permissions: ['audit:read', 'logs:read', 'policies:read'],
    valid_until: new Date(Date.now() + 1000 * 60 * 30).toISOString(),
  },
  'carol.williams': {
    user_roles: ['developer'],
    permissions: ['code:read', 'code:write', 'deploy:preview'],
    valid_until: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  'admin': {
    user_roles: ['super-admin'],
    permissions: ['*:*'],
    valid_until: null,
  },
  'guest-user': {
    user_roles: [],
    permissions: ['dashboard:read'],
    valid_until: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
  },
};

const formatDateTime = (dateInput: string | Date | null | undefined): string => {
  if (!dateInput) return 'Never expires';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return 'Invalid date';

  const now = new Date();
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const time = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  if (isToday) return `Today at ${time}`;

  const day = date.toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return `${day} at ${time}`;
};

export default function Simulation({ darkMode, cardClass, inputClass }: SimulationProps) {
  const [selectedUser, setSelectedUser] = useState<string>('alice.johnson');
  const [simulation, setSimulation] = useState<Simulation | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const loadSimulationForUser = useCallback(async (username: string) => {
    setLoading(true);
    setError(null);

    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 600));
      setSimulation(MOCK_SIMULATIONS[username] || { user_roles: [], permissions: [] });
      setLoading(false);
      return;
    }

    try {
      setSimulation({ user_roles: [], permissions: [] });
    } catch (err: any) {
      console.error('Failed to load simulation:', err);
      setError('Could not load simulation for this user');
      setSimulation(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSimulationForUser(selectedUser);
  }, [selectedUser, loadSimulationForUser]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredUsers = MOCK_USERNAMES.filter(user =>
    user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectUser = (username: string) => {
    setSelectedUser(username);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    inputRef.current?.focus();
  };

  const isActive = simulation?.valid_until
    ? new Date(simulation.valid_until) > new Date()
    : true;

  const statusConfig = isActive
    ? {
        icon: ShieldCheck,
        color: 'text-green-500',
        bg: 'bg-green-500/10',
        border: 'border-green-500/50',
        label: 'Active',
      }
    : {
        icon: ShieldOff,
        color: 'text-red-500',
        bg: 'bg-red-500/10',
        border: 'border-red-500/50',
        label: 'Expired',
      };

  return (
    <div className="space-y-6">
      {/* Main Card */}
      <div className={`${cardClass} border rounded-xl p-8 shadow-lg`}>
        <div className="mb-8">
          <label className="block text-sm font-semibold mb-3 flex items-center gap-2 opacity-90">
            <User size={18} />
            Select User to Simulate
          </label>
          
          <div ref={dropdownRef} className="relative">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                isOpen
                  ? 'border-blue-500 ring-4 ring-blue-500/20'
                  : darkMode
                  ? 'border-gray-600 hover:border-gray-500'
                  : 'border-gray-300 hover:border-gray-400'
              } ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
            >
              <Search size={20} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
              
              <input
                ref={inputRef}
                type="text"
                value={isOpen ? searchQuery : selectedUser}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (!isOpen) setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                placeholder="Search users..."
                className={`flex-1 bg-transparent outline-none text-base ${
                  darkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
                }`}
              />

              {isOpen && searchQuery && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClearSearch();
                  }}
                  className={`p-1 rounded-lg transition-colors ${
                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <X size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                </button>
              )}

              <ChevronDown
                size={20}
                className={`transition-transform ${isOpen ? 'rotate-180' : ''} ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              />
            </div>

            {isOpen && (
              <div
                className={`absolute z-50 w-full mt-2 rounded-xl border shadow-2xl overflow-hidden ${
                  darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
                }`}
              >
                <div className="max-h-64 overflow-y-auto">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((username) => (
                      <button
                        key={username}
                        onClick={() => handleSelectUser(username)}
                        className={`w-full px-4 py-3 text-left transition-colors flex items-center gap-3 ${
                          selectedUser === username
                            ? darkMode
                              ? 'bg-blue-900/30 text-blue-400'
                              : 'bg-blue-50 text-blue-600'
                            : darkMode
                            ? 'hover:bg-gray-800 text-gray-200'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <User size={16} />
                        <span className="font-medium">{username}</span>
                        {selectedUser === username && (
                          <ShieldCheck size={16} className="ml-auto" />
                        )}
                      </button>
                    ))
                  ) : (
                    <div className={`px-4 py-8 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <Search size={32} className="mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No users found matching "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {USE_MOCK_DATA && (
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
              Mock mode – choose any user above
            </p>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <RefreshCw className="animate-spin mr-3 text-blue-500" size={28} />
            <span className="text-lg">Loading simulation for <strong>{selectedUser}</strong>...</span>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <ShieldOff className="mx-auto mb-4 text-red-500" size={56} />
            <p className="text-lg font-medium">{error}</p>
          </div>
        )}

        {/* Success State */}
        {!loading && !error && simulation && (
          <>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <Shield className="text-blue-500" size={32} />
                Simulation Context
              </h3>
              <button
                onClick={() => loadSimulationForUser(selectedUser)}
                className={`p-2.5 rounded-lg transition-all hover:scale-105 ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
                title="Refresh simulation"
              >
                <RefreshCw size={20} />
              </button>
            </div>

            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${
              darkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <User size={16} className="text-blue-500" />
              <span className="font-semibold text-blue-600 dark:text-blue-400">@{selectedUser}</span>
            </div>

            <div className={`flex items-center gap-4 p-5 rounded-xl border-2 ${statusConfig.bg} ${statusConfig.border} mb-6`}>
              <statusConfig.icon className={statusConfig.color} size={36} />
              <div className="flex-1">
                <p className="font-bold text-lg">
                  Status: <span className={statusConfig.color}>{statusConfig.label}</span>
                </p>
                {simulation.valid_until && (
                  <p className={`text-sm opacity-75 flex items-center gap-2 mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <Clock size={16} />
                    Expires: {formatDateTime(simulation.valid_until)}
                  </p>
                )}
              </div>
            </div>

            {/* Roles Section */}
            <div className="mb-6">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Users size={22} />
                Roles
                <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'
                }`}>
                  {simulation.user_roles.length}
                </span>
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {simulation.user_roles.length > 0 ? (
                  simulation.user_roles.map((role) => (
                    <span
                      key={role}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-transform hover:scale-105 ${
                        darkMode
                          ? 'bg-blue-900/20 text-blue-400 border-blue-500/50'
                          : 'bg-blue-50 text-blue-600 border-blue-300'
                      }`}
                    >
                      {role}
                    </span>
                  ))
                ) : (
                  <p className={`text-sm italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    No roles assigned
                  </p>
                )}
              </div>
            </div>

            {/* Permissions Section */}
            <div>
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Lock size={22} />
                Permissions
                <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
                }`}>
                  {simulation.permissions.length}
                </span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {simulation.permissions.length > 0 ? (
                  simulation.permissions.map((perm) => (
                    <div
                      key={perm}
                      className={`px-4 py-3 rounded-lg text-sm font-medium border-2 transition-transform hover:scale-105 ${
                        darkMode
                          ? 'bg-green-900/20 text-green-400 border-green-500/50'
                          : 'bg-green-50 text-green-600 border-green-300'
                      }`}
                    >
                      <code className="break-all">{perm}</code>
                    </div>
                  ))
                ) : (
                  <p className={`col-span-full text-sm italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    No permissions assigned
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      {/* End of Main Card */}
    </div>
  );
}