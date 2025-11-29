'use client';

import { useState, useEffect} from 'react';
import {
  Menu,
  X,
  Sun,
  Moon,
  Shield,
  Activity,
  Code,
  Folder,
  Database as DatabaseIcon,
  Users as UsersIcon,
  Play,
  FileText,
  Code2,
  AlertTriangle,
  CheckCircle,
  LogOut,
  User as UserIcon,
} from 'lucide-react';
import { api } from '../lib/api';
import { AuditLogEntry, EvaluateResult, FileSystemNode, PolicyAnalysis, Resource, Role, User } from '@/models/model';
import Login  from './login/page';
import ThemedFileManager from './file-browser/page';
import { PolicyEditor } from './rpl_editor/page';
import { DatabaseViewer } from './database/page';
import { RolesPage } from './roles/page';
import { Simulation } from './simulation/page';
import { AuditLogs } from './audit/page';
import { AIInsights } from './insights/page';
import Dashboard from './dashboard/page';
import { UsersPage } from './user_page/page';
import { ApiExplorer } from './api_explorer/page';

export function App(){
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<string>('login');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [auditLogs, setAuditLogs] = useState<
    AuditLogEntry[]
  >([]);
  const [analysis, setAnalysis] = useState<PolicyAnalysis | null>(null);
  const [policyCode, setPolicyCode] = useState<string>('');
  const [fileSystem, setFileSystem] = useState<FileSystemNode | null>(null);
  const [toast, setToast] = useState<{ message: string; type?: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null); 
  
  useEffect(() => {
    if (currentUser) {
      loadData();
    }
  }, [currentUser]);

  const loadData = async (): Promise<void> => {
    const [u, r, a, pc, fs, ro] = await Promise.all([
      api.getUsers(),
      api.getResources(),
      api.getPolicyAnalysis(),
      api.getPolicyCode(),
      api.getFileSystem(),
      api.getRoles()
    ]);
    setUsers(u);
    setResources(r);
    setAnalysis(a);
    setPolicyCode(pc);
    setFileSystem(fs);
    setRoles(ro);
  };

  const showToast = (message: string, type?: string): void => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const simulateAccess = async (user: string, resource: string, action: string): Promise<EvaluateResult> => {
    // Restrict simulation to logged-in user or admins
    if (currentUser && currentUser.role !== 'Admin' && user !== currentUser.name) {
      showToast('Access denied: Can only simulate own access', 'error');
      return { allowed: false, rule: 'DENY: Unauthorized simulation', riskScore: 100, trace: [] };
    }
    setLoading(true);
    try {
      const result = await api.evaluate(user, resource, action);
      const logEntry: AuditLogEntry = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        user,
        resource,
        action,
        result: result.allowed ? 'allowed' : 'denied',
        reason: result.rule,
        riskScore: result.riskScore
      };
      setAuditLogs((prev) => [logEntry, ...prev]);
      showToast(`Access ${result.allowed ? 'granted' : 'denied'}: ${result.rule}`, result.allowed ? 'success' : 'error');
      return result;
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (user: any) => {
    setCurrentUser(user);
    setCurrentPage('dashboard');
    showToast(`Welcome, ${user.name}!`, 'success');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
    setAuditLogs([]);
    showToast('Logged out successfully', 'info');
  };

  const bgClass = darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900';
  const cardClass = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const inputClass = darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900';

  // Permission-based nav items
  const getNavItems = () => {
    if (!currentUser) return [];

    const baseItems = [
      { id: 'dashboard', icon: Activity, label: 'Dashboard' },
      { id: 'file-browser', icon: Folder, label: 'File Browser' },
    ];

    const role = currentUser.role;
    switch (role) {
      case 'Admin':
        return [
          ...baseItems,
          { id: 'policy-editor', icon: Code, label: 'Policy Editor' },
          { id: 'database', icon: DatabaseIcon, label: 'Database Viewer' },
          { id: 'roles', icon: Shield, label: 'Roles & Permissions' },
          { id: 'users', icon: UsersIcon, label: 'User Details' },
          { id: 'simulation', icon: Play, label: 'Simulate Access' },
          { id: 'audit', icon: FileText, label: 'Audit Logs' },
          { id: 'ai-insights', icon: AlertTriangle, label: 'AI Insights' },
          { id: 'api-explorer', icon: Code2 , label: 'API Explorer' }
        ];
      case 'Developer':
        return [
          ...baseItems,
          { id: 'database', icon: DatabaseIcon, label: 'Database Viewer' },
          { id: 'simulation', icon: Play, label: 'Simulate Access' },
          { id: 'audit', icon: FileText, label: 'Audit Logs' }
        ];
      case 'Manager':
        return [
          ...baseItems,
          { id: 'database', icon: DatabaseIcon, label: 'Database Viewer' },
          { id: 'audit', icon: FileText, label: 'Audit Logs' }
        ];
      case 'Guest':
        return baseItems; // Limited to public views
      default:
        return baseItems;
    }
  };

  const navItems = getNavItems();
  const pageTitle = currentPage
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-200`}>
      {/* Toast Notification - Modern Style */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 px-5 py-3.5 rounded-xl shadow-2xl backdrop-blur-sm border ${
            toast.type === 'success'
              ? 'bg-green-500/90 border-green-400/50'
              : toast.type === 'error'
              ? 'bg-red-500/90 border-red-400/50'
              : 'bg-blue-500/90 border-blue-400/50'
          } text-white flex items-center gap-3 animate-in slide-in-from-top-5 duration-300`}
        >
          {toast.type === 'success' ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
          <span className="font-medium">{toast.message}</span>
        </div>
      )}

      {/* Login Overlay */}
      {!currentUser && <Login onLogin={handleLogin} darkMode={darkMode} cardClass={cardClass} />}

      {/* App Content */}
      {currentUser && (
        <>
          {/* Sidebar - Enhanced Design */}
          <div
            className={`fixed left-0 top-0 h-full ${sidebarOpen ? 'w-72' : 'w-0'} ${cardClass} border-r transition-all duration-300 overflow-hidden z-40 shadow-xl`}
          >
            <div className="flex flex-col h-full">
              {/* Sidebar Header */}
              <div className="p-6 border-b border-gray-700/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Shield className="text-blue-500" size={24} />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-lg font-bold">RPL Security</h1>
                    <p className="text-xs opacity-60">Policy Manager</p>
                  </div>
                </div>

                {/* User Info Card */}
                <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'} rounded-lg p-3 flex items-center gap-3`}>
                  <div className="p-2 bg-blue-500/20 rounded-full">
                    <UserIcon size={16} className="text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{currentUser.name}</p>
                    <p className="text-xs opacity-70">{currentUser.role}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors group"
                    title="Logout"
                  >
                    <LogOut size={16} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                  </button>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setCurrentPage(item.id)}
                      className={`w-full flex cursor-pointer items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30 scale-[1.02]'
                          : darkMode
                          ? 'hover:bg-gray-700/50 text-gray-300 hover:text-white'
                          : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Icon size={20} className={isActive ? '' : 'opacity-70'} />
                      <span className="truncate font-medium text-sm">{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Sidebar Footer */}
              <div className="p-4 border-t border-gray-700/50">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {darkMode ? <Moon size={20} /> : <Sun size={20} />}
                  <span className="text-sm font-medium">
                    {darkMode ? 'Dark' : 'Light'} Mode
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className={`${sidebarOpen ? 'ml-72' : 'ml-0'} transition-all duration-300`}>
            {/* Header - Streamlined */}
            <header className={`${cardClass} border-b backdrop-blur-sm sticky top-0 z-30 shadow-sm`}>
              <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className={`p-2.5 rounded-xl transition-all ${
                      darkMode 
                        ? 'hover:bg-gray-700 active:scale-95' 
                        : 'hover:bg-gray-100 active:scale-95'
                    }`}
                  >
                    {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
                  </button>
                  <div>
                    <h2 className="text-xl font-bold">{pageTitle}</h2>
                    <p className="text-xs opacity-60 mt-0.5">
                      {new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </header>

            <main className="p-8 max-w-[1600px] mx-auto">
              {currentPage === 'dashboard' && analysis !== null && (
                <Dashboard darkMode={darkMode} cardClass={cardClass}  />
              )}
             
              {currentPage === 'file-browser' && fileSystem !== null && (
                <ThemedFileManager
                    darkMode={darkMode}
                    cardClass={cardClass}
                    inputClass={inputClass}
                />
              )}
              {currentPage === 'policy-editor' &&
                <PolicyEditor
                  darkMode={darkMode}
                  cardClass={cardClass}
                />
              }
              {currentPage === 'database' && (
                <DatabaseViewer
                  darkMode={darkMode}
                  cardClass={cardClass}
                  inputClass={inputClass}
                  simulateAccess={simulateAccess}
                  users={users}
                />
              )}
              {currentPage === 'api-explorer' && (
                <ApiExplorer
                  darkMode={darkMode}
                  // cardClass={cardClass}
                  // inputClass={inputClass}
                />
              )}
              {currentPage === 'roles' && <RolesPage darkMode={darkMode} cardClass={cardClass} roles={roles} />}
              {currentPage === 'users' && (
                <UsersPage darkMode={darkMode} cardClass={cardClass} inputClass={inputClass} users={users} setUsers={setUsers} />
              )}
              {currentPage === 'simulation' && (
                <Simulation
                  darkMode={darkMode}
                  cardClass={cardClass}
                  inputClass={inputClass}
                  users={users}
                  resources={resources}
                  simulateAccess={simulateAccess}
                  loading={loading}
                />
              )}
              {currentPage === 'audit' && (
                <AuditLogs darkMode={darkMode} cardClass={cardClass} inputClass={inputClass}  />
              )}
              {currentPage === 'ai-insights' && analysis !== null && (
                <AIInsights darkMode={darkMode} cardClass={cardClass} analysis={analysis} loadData={loadData} />
              )}
            </main>
          </div>
        </>
      )}
    </div>
  );
}

export default App;