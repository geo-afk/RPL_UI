'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Edit, Trash2, X, Search, Filter } from 'lucide-react';

interface UsersPageProps {
  darkMode: boolean;
  cardClass: string;
  inputClass: string;
  users: any[];
  setUsers: React.Dispatch<React.SetStateAction<any[]>>;
}

const Modal = ({ isOpen, onClose, children }: any) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose}></div>
        <div className="relative z-50 w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left shadow-xl transition-all">
          {children}
        </div>
      </div>
    </div>
  );
};

export function UsersPage({ darkMode, cardClass, inputClass, users, setUsers }: UsersPageProps) {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editUser, setEditUser] = useState({ name: '', role: '', department: '', email: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'role' | 'department'>('name');

  // Get unique roles and departments for filters
  const uniqueRoles = useMemo(() => [...new Set(users.map(u => u.role))], [users]);
  const uniqueDepartments = useMemo(() => [...new Set(users.map(u => u.department))], [users]);

  // Filter and sort users
  const filteredUsers = useMemo(() => {
    return users
      .filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            user.email?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        const matchesDept = departmentFilter === 'all' || user.department === departmentFilter;
        return matchesSearch && matchesRole && matchesDept;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'role') return a.role.localeCompare(b.role);
        if (sortBy === 'department') return a.department.localeCompare(b.department);
        return 0;
      });
  }, [users, searchQuery, roleFilter, departmentFilter, sortBy]);

  const openEditModal = (user: any) => {
    setSelectedUser(user);
    setEditUser({ name: user.name, role: user.role, department: user.department || '', email: user.email || '' });
    setShowEditModal(true);
  };

  const openAddModal = () => {
    setEditUser({ name: '', role: '', department: '', email: '' });
    setShowAddModal(true);
  };

  const handleEditSubmit = () => {
    if (!editUser.name || !editUser.role) {
      alert('Name and role are required.');
      return;
    }
    setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...editUser } : u));
    setShowEditModal(false);
    setSelectedUser({ ...selectedUser, ...editUser });
  };

  const handleAddSubmit = () => {
    if (!editUser.name || !editUser.role) {
      alert('Name and role are required.');
      return;
    }
    const newUser = {
      id: Date.now(),
      ...editUser,
      permissions: [],
      department: editUser.department || 'Unassigned'
    };
    setUsers([...users, newUser]);
    setShowAddModal(false);
  };

  const handleDelete = () => {
    setUsers(users.filter(u => u.id !== selectedUser.id));
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const exportUsers = () => {
    const dataStr = JSON.stringify(users, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `users-export-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const clearFilters = () => {
    setSearchQuery('');
    setRoleFilter('all');
    setDepartmentFilter('all');
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className={`${cardClass} border rounded-lg p-4`}>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className={`${inputClass} pl-10 w-full px-4 py-2 rounded-lg border`}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              className={`${inputClass} px-3 py-2 rounded-lg border`}
            >
              <option value="all">All Roles</option>
              {uniqueRoles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            <select
              value={departmentFilter}
              onChange={e => setDepartmentFilter(e.target.value)}
              className={`${inputClass} px-3 py-2 rounded-lg border`}
            >
              <option value="all">All Departments</option>
              {uniqueDepartments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className={`${inputClass} px-3 py-2 rounded-lg border`}
            >
              <option value="name">Sort by Name</option>
              <option value="role">Sort by Role</option>
              <option value="department">Sort by Department</option>
            </select>
            {(searchQuery || roleFilter !== 'all' || departmentFilter !== 'all') && (
              <button
                onClick={clearFilters}
                className="px-3 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg text-sm"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        <div className="mt-3 text-sm opacity-70">
          Showing {filteredUsers.length} of {users.length} users
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredUsers.length === 0 ? (
            <div className={`${cardClass} border rounded-lg p-8 text-center col-span-2`}>
              <p className="text-lg opacity-70">No users found</p>
              <p className="text-sm opacity-50 mt-2">Try adjusting your filters or search query</p>
            </div>
          ) : (
            filteredUsers.map(user => (
              <div
                key={user.id}
                className={`${cardClass} border rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all ${selectedUser?.id === user.id ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setSelectedUser(user)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {user.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{user.name}</h3>
                    <p className="text-sm opacity-70 truncate">{user.email}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-70">Role</span>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-500 rounded text-sm truncate max-w-[150px]">{user.role}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-70">Department</span>
                    <span className="text-sm truncate max-w-[150px]">{user.department}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-70">Permissions</span>
                    <span className="text-sm font-semibold">{user.permissions.length}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className={`${cardClass} border rounded-lg p-6 h-fit sticky top-24`}>
          <h3 className="text-lg font-semibold mb-4">User Details</h3>
          {selectedUser ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-700">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {selectedUser.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xl font-bold truncate">{selectedUser.name}</h4>
                  <p className="text-sm opacity-70 truncate">{selectedUser.email}</p>
                </div>
              </div>
              <div>
                <p className="text-sm opacity-70 mb-1">Role</p>
                <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm inline-block">
                  {selectedUser.role}
                </span>
              </div>
              <div>
                <p className="text-sm opacity-70 mb-2">Permissions ({selectedUser.permissions.length})</p>
                {selectedUser.permissions.length === 0 ? (
                  <p className="text-sm opacity-50 italic">No permissions assigned</p>
                ) : (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {selectedUser.permissions.map((perm: string, i: number) => {
                      const [action, resource] = perm.split(':');
                      return (
                        <div key={i} className={`p-3 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-semibold opacity-70">ACTION</span>
                            <span className="text-xs font-semibold text-blue-500">{action}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold opacity-70">RESOURCE</span>
                            <span className="text-xs font-mono">{resource}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="pt-4 space-y-2">
                <button
                  onClick={() => openEditModal(selectedUser)}
                  className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded flex items-center justify-center gap-2 transition-colors"
                >
                  <Edit size={16} />
                  Edit User
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 rounded flex items-center justify-center gap-2 transition-colors"
                >
                  <Trash2 size={16} />
                  Delete User
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Filter size={24} className="opacity-50" />
              </div>
              <p className="text-sm opacity-70">Select a user to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Add User Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Add New User</h3>
          <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name *"
            value={editUser.name}
            onChange={e => setEditUser({...editUser, name: e.target.value})}
            className={`px-4 py-2 rounded-lg border ${inputClass} w-full`}
          />
          <input
            type="text"
            placeholder="Role *"
            value={editUser.role}
            onChange={e => setEditUser({...editUser, role: e.target.value})}
            className={`px-4 py-2 rounded-lg border ${inputClass} w-full`}
          />
          <input
            type="text"
            placeholder="Department"
            value={editUser.department}
            onChange={e => setEditUser({...editUser, department: e.target.value})}
            className={`px-4 py-2 rounded-lg border ${inputClass} w-full`}
          />
          <input
            type="email"
            placeholder="Email"
            value={editUser.email}
            onChange={e => setEditUser({...editUser, email: e.target.value})}
            className={`px-4 py-2 rounded-lg border ${inputClass} w-full`}
          />
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium bg-gray-300 text-gray-700 hover:bg-gray-400 rounded-md"
            onClick={() => setShowAddModal(false)}
          >
            Cancel
          </button>
          <button
            onClick={handleAddSubmit}
            className="px-4 py-2 text-sm font-medium bg-green-500 text-white hover:bg-green-600 rounded-md"
          >
            Add User
          </button>
        </div>
      </Modal>

      {/* Edit User Modal */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Edit User</h3>
          <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name *"
            value={editUser.name}
            onChange={e => setEditUser({...editUser, name: e.target.value})}
            className={`px-4 py-2 rounded-lg border ${inputClass} w-full`}
          />
          <input
            type="text"
            placeholder="Role *"
            value={editUser.role}
            onChange={e => setEditUser({...editUser, role: e.target.value})}
            className={`px-4 py-2 rounded-lg border ${inputClass} w-full`}
          />
          <input
            type="text"
            placeholder="Department"
            value={editUser.department}
            onChange={e => setEditUser({...editUser, department: e.target.value})}
            className={`px-4 py-2 rounded-lg border ${inputClass} w-full`}
          />
          <input
            type="email"
            placeholder="Email"
            value={editUser.email}
            onChange={e => setEditUser({...editUser, email: e.target.value})}
            className={`px-4 py-2 rounded-lg border ${inputClass} w-full`}
          />
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium bg-gray-300 text-gray-700 hover:bg-gray-400 rounded-md"
            onClick={() => setShowEditModal(false)}
          >
            Cancel
          </button>
          <button
            onClick={handleEditSubmit}
            className="px-4 py-2 text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 rounded-md"
          >
            Save Changes
          </button>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <div className="flex items-center justify-center mb-4">
          <Trash2 className="h-12 w-12 text-red-500" />
        </div>
        <h3 className="text-lg font-medium text-center text-gray-900 dark:text-white mb-2">
          Delete User
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center">
          Are you sure you want to delete <span className="font-semibold">{selectedUser?.name}</span>? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium bg-gray-300 text-gray-700 hover:bg-gray-400 rounded-md"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-medium bg-red-500 text-white hover:bg-red-600 rounded-md"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}