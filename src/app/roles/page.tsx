'use client';

import { useState } from 'react';
import { Shield, ChevronRight } from 'lucide-react';

interface RolesPageProps {
  darkMode: boolean;
  cardClass: string;
  roles: any[];
}

export function RolesPage({ darkMode, cardClass, roles }: RolesPageProps) {
  const [selectedRole, setSelectedRole] = useState<any>(null);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className={`lg:col-span-2 space-y-4`}>
        {roles.map(role => (
          <div
            key={role.id}
            className={`${cardClass} border rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow ${selectedRole?.id === role.id ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setSelectedRole(role)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Shield className="text-blue-500" size={32} />
                <div>
                  <h3 className="text-xl font-bold">{role.name}</h3>
                  <p className="text-sm opacity-70">{role.description}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-500 rounded-full text-sm">
                {role.users.length} users
              </span>
            </div>
            {role.inherits.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-semibold mb-2">Inherits from:</p>
                <div className="flex gap-2 flex-wrap">
                  {role.inherits.map((inherited: string) => (
                    <span key={inherited} className={`px-2 py-1 rounded text-xs ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      {inherited}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div>
              <p className="text-sm font-semibold mb-2">Permissions ({role.permissions.length}):</p>
              <div className="space-y-1">
                {role.permissions.slice(0, 3).map((perm: string, i: number) => (
                  <div key={i} className={`px-3 py-2 rounded text-sm ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    {perm}
                  </div>
                ))}
                {role.permissions.length > 3 && (
                  <p className="text-sm opacity-70 pl-3">+{role.permissions.length - 3} more...</p>
                )}
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-sm font-semibold mb-2">Users with this role:</p>
              <div className="flex gap-2 flex-wrap">
                {role.users.map((user: string) => (
                  <span key={user} className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm">
                    {user}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={`${cardClass} border rounded-lg p-6 h-fit sticky top-24`}>
        <h3 className="text-lg font-semibold mb-4">Role Details</h3>
        {selectedRole ? (
          <div className="space-y-4">
            <div>
              <p className="text-sm opacity-70 mb-1">Role Name</p>
              <p className="text-xl font-bold">{selectedRole.name}</p>
            </div>
            <div>
              <p className="text-sm opacity-70 mb-1">Description</p>
              <p>{selectedRole.description}</p>
            </div>
            <div>
              <p className="text-sm opacity-70 mb-2">All Permissions</p>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {selectedRole.permissions.map((perm: string, i: number) => (
                  <div key={i} className={`px-3 py-2 rounded text-sm ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <code>{perm}</code>
                  </div>
                ))}
              </div>
            </div>
            {selectedRole.inherits.length > 0 && (
              <div>
                <p className="text-sm opacity-70 mb-2">Inheritance Chain</p>
                <div className="flex flex-col gap-2">
                  {selectedRole.inherits.map((inherited: string) => (
                    <div key={inherited} className="flex items-center gap-2">
                      <ChevronRight size={16} />
                      <span className={`px-2 py-1 rounded text-sm ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        {inherited}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm opacity-70">Select a role to view details</p>
        )}
      </div>
    </div>
  );
}