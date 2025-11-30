'use client';

import { useCallback, useEffect, useState } from 'react';
import { Shield, ChevronRight, Link } from 'lucide-react';
import { api } from '@/lib/api';

interface RolesPageProps {
  darkMode: boolean;
  cardClass: string;
}

// Updated interface to match real API response
export interface Role {
  id: number;
  name: string;
  parent_role_id: number | null;
  line_number: number;
  attributes: Record<string, any>;
}

export function RolesPage({ darkMode, cardClass }: RolesPageProps) {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const loadRoles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.retrieveAllRoles();
      const roleList: Role[] = Array.isArray(data) ? data : [];
      setRoles(roleList);

      if (roleList.length > 0 && !selectedRole) {
        setSelectedRole(roleList[0]);
      }
    } catch (err: any) {
      console.error('Failed to fetch roles:', err);
      setError('Failed to load roles. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRoles();
  }, [loadRoles]);

  // Recursively get parent role names (for inheritance chain)
  const getInheritedRoleNames = (roleId: number | null): string[] => {
    if (!roleId) return [];
    const parent = roles.find((r) => r.id === roleId);
    if (!parent) return [];
    return [parent.name, ...getInheritedRoleNames(parent.parent_role_id)];
  };

  const getParentRoleName = (roleId: number | null): string | null => {
    if (!roleId) return null;
    const parent = roles.find((r) => r.id === roleId);
    return parent?.name || null;
  };

  /* ------------------------------------------------------------------ */
  /* Loading & Error States                                             */
  /* ------------------------------------------------------------------ */
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${cardClass} border rounded-lg p-8 text-center`}>
        <p className="text-red-500">{error}</p>
        <button
          onClick={loadRoles}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  /* ------------------------------------------------------------------ */
  /* Main UI                                                            */
  /* ------------------------------------------------------------------ */
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Roles List */}
      <section className="lg:col-span-2">
        <div className="flex items-center mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-500" />
            Roles ({roles.length})
          </h2>
        </div>

        {roles.length === 0 ? (
          <div className={`${cardClass} border rounded-lg p-16 text-center opacity-70`}>
            <Shield size={56} className="mx-auto mb-4 text-gray-400" />
            <p className="text-lg">No roles found.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {roles.map((role) => {
              const inheritedRoles = getInheritedRoleNames(role.parent_role_id);
              const isSelected = selectedRole?.id === role.id;

              return (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(role)}
                  className={`${cardClass} border rounded-xl p-6 cursor-pointer transition-all
                    hover:shadow-md ${isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <Shield className="w-10 h-10 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-xl font-semibold">{role.name}</h3>
                        {role.parent_role_id !== null && (
                          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <Link size={14} />
                            Inherits from parent role
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Show inheritance chain */}
                  {inheritedRoles.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <ChevronRight size={16} className="text-gray-500" />
                        Inherits from:
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {inheritedRoles.map((name) => (
                          <span
                            key={name}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              darkMode
                                ? 'bg-gray-700 text-gray-200'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* No permissions in this API – show placeholder */}
                  <div className="mt-4 text-sm text-gray-500 italic">
                    No direct permissions defined (inherits from parent if any)
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Role Details Panel */}
      <aside className={`${cardClass} border rounded-xl p-6 lg:sticky lg:top-6 h-fit`}>
        <h3 className="text-2xl font-bold flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-blue-500" />
          Role Details
        </h3>

        {selectedRole ? (
          <div className="space-y-7">
            <div>
              <p className="text-sm text-gray-500 mb-1">Role Name</p>
              <p className="text-2xl font-bold">{selectedRole.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Role ID</p>
              <p className="font-mono">{selectedRole.id}</p>
            </div>

            {selectedRole.parent_role_id !== null && (
              <>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Parent Role ID</p>
                  <p className="font-mono text-sm">{selectedRole.parent_role_id}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Inherits From</p>
                  <p className="font-semibold">
                    {getParentRoleName(selectedRole.parent_role_id) || 'Unknown'}
                  </p>
                </div>

                {getInheritedRoleNames(selectedRole.parent_role_id).length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Full Inheritance Chain</p>
                    <div className="flex flex-wrap gap-2">
                      {getInheritedRoleNames(selectedRole.parent_role_id).map((name, i, arr) => (
                        <span key={name} className="flex items-center gap-1 text-sm">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {name}
                          </span>
                          {i < arr.length - 1 && <ChevronRight size={14} className="text-gray-400" />}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {selectedRole.parent_role_id === null && (
              <div>
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Root Role — No parent
                </p>
              </div>
            )}

            <div>
              <p className="text-sm text-gray-500 mb-1">Source Line</p>
              <p className="font-mono text-sm">Line {selectedRole.line_number}</p>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500">
                Role defined in configuration file
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Select a role to view its details</p>
        )}
      </aside>
    </div>
  );
}