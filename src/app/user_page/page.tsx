'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import { api } from '@/lib/api';

interface UsersPageProps {
  darkMode: boolean;
  cardClass: string;
  inputClass: string;
}

// Adjusted to exactly match the API response
export interface UserFromApi {
  id: number;
  name: string;
  attributes: Record<string, any>;
  valid_from: string | null;
  valid_until: string | null;
  details_id: number | null;
  line_number: number;
}

const UsersPage: React.FC<UsersPageProps> = ({ darkMode, cardClass, inputClass }) => {
  const [users, setUsers] = useState<UserFromApi[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserFromApi | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.retrieveAllUsers();
      // The API returns an array of objects exactly like UserFromApi
      setUsers(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error('Failed to fetch users:', err);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch = user.name.toLowerCase().includes(query);

        // No role filtering needed because the objects have no roles
        return matchesSearch;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [users, searchQuery]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-8 text-lg">{error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`${cardClass} border rounded-lg p-6`}>
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`${inputClass} pl-10 w-full px-4 py-2 rounded-lg border`}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 text-sm opacity-70">
          Showing {filteredUsers.length} of {users.length} users
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Users Grid */}
        <div className="lg:col-span-2 space-y-4">
          {filteredUsers.length === 0 ? (
            <div className={`${cardClass} text-center py-16 border rounded-lg`}>
              <p className="text-lg opacity-70">No users found</p>
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`${cardClass} border rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all ${
                  selectedUser?.id === user.id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{user.name}</h3>
                      <div className="text-sm opacity-70 space-y-1 mt-1">
                        {user.valid_from && (
                          <div>Valid from: {user.valid_from}</div>
                        )}
                        {user.valid_until && (
                          <div>Valid until: {user.valid_until}</div>
                        )}
                        {user.valid_from === null && user.valid_until === null && (
                          <div className="italic">No validity period set</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Details Panel */}
        <div className={`${cardClass} border rounded-lg p-6 sticky top-24 h-fit`}>
          {selectedUser ? (
            <div className="space-y-6">
              <div className="flex items-center gap-4 pb-4 border-b">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {selectedUser.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedUser.name}</h3>
                  <p className="text-sm opacity-70">ID: {selectedUser.id}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Validity</h4>
                <div className="text-sm space-y-1">
                  <div>
                    <span className="font-medium">From:</span>{' '}
                    {selectedUser.valid_from ?? 'Not set'}
                  </div>
                  <div>
                    <span className="font-medium">Until:</span>{' '}
                    {selectedUser.valid_until ?? 'No expiration'}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Other Information</h4>
                <div className="text-sm space-y-1">
                  <div>
                    <span className="font-medium">Line number:</span> {selectedUser.line_number}
                  </div>
                  {selectedUser.details_id !== null && (
                    <div>
                      <span className="font-medium">Details ID:</span> {selectedUser.details_id}
                    </div>
                  )}
                  {Object.keys(selectedUser.attributes).length > 0 ? (
                    <div className="mt-3">
                      <span className="font-medium">Attributes:</span>
                      <pre className="mt-1 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
                        {JSON.stringify(selectedUser.attributes, null, 2)}
                      </pre>
                    </div>
                  ) : (
                    <div className="text-sm opacity-50">No additional attributes</div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Search size={32} className="text-gray-400" />
              </div>
              <p className="opacity-70">Select a user to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;