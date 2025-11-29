'use client';

import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { 
  ChevronRight, 
  ChevronDown, 
  Send, 
  Loader2, 
  Copy, 
  Terminal,
  Code2,
  Key,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ApiEndpoint {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  summary?: string;
  parameters?: Array<{ name: string; in: 'query' | 'path' | 'header'; required?: boolean }>;
  requestBody?: { 
    required?: boolean; 
    content?: { 
      'application/json'?: { 
        example?: any;
      } 
    } 
  };
}

interface ApiResponse {
  status: number;
  statusText: string;
  data: any;
  headers: Record<string, string>;
  timeMs: number;
}

const mockEndpoints: ApiEndpoint[] = [
  { path: '/api/users', method: 'GET', summary: 'List all users' },
  { 
    path: '/api/users/{id}', 
    method: 'GET', 
    summary: 'Get user by ID', 
    parameters: [{ name: 'id', in: 'path', required: true }] 
  },
  { 
    path: '/api/users', 
    method: 'POST', 
    summary: 'Create new user', 
    requestBody: { 
      required: true,
      content: { 'application/json': { example: { name: "John Doe", email: "john@example.com", age: 30 } } }
    }
  },
  { 
    path: '/api/users/{id}', 
    method: 'PUT', 
    summary: 'Update user',
    parameters: [{ name: 'id', in: 'path', required: true }],
    requestBody: { required: true }
  },
  { path: '/api/health', method: 'GET', summary: 'Health check' },
];

export function ApiExplorer({ darkMode = false }: { darkMode?: boolean }) {
  const [endpoints, setEndpoints] = useState<ApiEndpoint[]>([]);
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [requestHeaders, setRequestHeaders] = useState<string>('{\n  "Content-Type": "application/json"\n}');
  const [requestBody, setRequestBody] = useState<string>('{\n  \n}');
  const [queryParams, setQueryParams] = useState<string>('');
  const [pathParamValues, setPathParamValues] = useState<Record<string, string>>({});
  // <-- Fix: allow undefined values in the error map so you can set a key to undefined
  const [pathParamErrors, setPathParamErrors] = useState<Record<string, string | undefined>>({});
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'response' | 'headers' | 'curl'>('response');
  const [token, setToken] = useState<string>('');
  const [tokenLoading, setTokenLoading] = useState(false);

  // Fetch access token
  const fetchToken = async () => {
    setTokenLoading(true);
    try {
      const res = await fetch('/api/auth/token');
      if (res.ok) {
        const data = await res.json();
        setToken(data.access_token || data.token || '');
      }
    } catch {
      setToken('mock-jwt-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.x');
    } finally {
      setTokenLoading(false);
    }
  };

  useEffect(() => { fetchToken(); }, []);

  // Auto-add Bearer token to headers
  useEffect(() => {
    if (token) {
      try {
        const headers = JSON.parse(requestHeaders);
        headers.Authorization = `Bearer ${token}`;
        setRequestHeaders(JSON.stringify(headers, null, 2));
      } catch {
        setRequestHeaders(`{
  "Content-Type": "application/json",
  "Authorization": "Bearer ${token}"
}`);
      }
    }
  }, [token]);

  // Load endpoints
  useEffect(() => {
    const fetchEndpoints = async () => {
      try {
        const res = await fetch('/api/endpoints');
        if (res.ok) {
          const data = await res.json();
          setEndpoints(data.endpoints || []);
        } else {
          setEndpoints(mockEndpoints);
        }
      } catch {
        setEndpoints(mockEndpoints);
      }
    };
    fetchEndpoints();
  }, []);

  const groupedEndpoints = endpoints.reduce((acc, ep) => {
    const base = ep.path.split('/').slice(0, 3).join('/') || '/';
    if (!acc[base]) acc[base] = [];
    acc[base].push(ep);
    return acc;
  }, {} as Record<string, ApiEndpoint[]>);

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const buildFinalUrl = () => {
    if (!selectedEndpoint) return '';
    let url = selectedEndpoint.path;

    selectedEndpoint.parameters
      ?.filter(p => p.in === 'path')
      .forEach(param => {
        const value = pathParamValues[param.name] || `{${param.name}}`;
        url = url.replace(`{${param.name}}`, encodeURIComponent(value));
      });

    if (queryParams) url += (url.includes('?') ? '&' : '?') + queryParams;
    return url;
  };

  const pathParams = selectedEndpoint?.parameters?.filter(p => p.in === 'path') || [];

  const getSampleBody = () => {
    const example = selectedEndpoint?.requestBody?.content?.['application/json']?.example;
    return example ? JSON.stringify(example, null, 2) : '{\n  \n}';
  };

  const handleSendRequest = async () => {
    if (!selectedEndpoint) return;

    // Validate required path params and integers
    for (const param of pathParams) {
      const val = pathParamValues[param.name] || '';
      if (param.required && !val.trim()) {
        alert(`Please enter a value for ${param.name}`);
        return;
      }
      if (param.name.toLowerCase().includes('id') && val && !/^\d+$/.test(val)) {
        setPathParamErrors(prev => ({ ...prev, [param.name]: 'Must be a valid integer' }));
        return;
      } else {
        setPathParamErrors(prev => ({ ...prev, [param.name]: undefined }));
      }
    }

    setLoading(true);
    setResponse(null);

    const url = buildFinalUrl();
    const startTime = Date.now();

    try {
      let headers: Record<string, string> = {};
      let body: any = null;

      try { headers = JSON.parse(requestHeaders); } catch {}
      if (['POST', 'PUT', 'PATCH'].includes(selectedEndpoint.method)) {
        try { body = JSON.parse(requestBody); } catch {}
      }

      const res = await fetch(url, {
        method: selectedEndpoint.method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      let data: any;
      try { data = await res.json(); } catch { data = await res.text(); }

      const responseHeaders: Record<string, string> = {};
      res.headers.forEach((v, k) => { responseHeaders[k] = v; });

      setResponse({
        status: res.status,
        statusText: res.statusText,
        data,
        headers: responseHeaders,
        timeMs: Date.now() - startTime,
      });
    } catch (err: any) {
      setResponse({
        status: 0,
        statusText: 'Network Error',
        data: { error: err.message || 'Request failed' },
        headers: {},
        timeMs: Date.now() - startTime,
      });
    } finally {
      setLoading(false);
    }
  };

  const methodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-emerald-600';
      case 'POST': return 'bg-blue-600';
      case 'PUT': case 'PATCH': return 'bg-amber-600';
      case 'DELETE': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const bgColor = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';
  const textColor = darkMode ? 'text-gray-100' : 'text-gray-900';
  const mutedText = darkMode ? 'text-gray-400' : 'text-gray-600';

  const getCurlCommand = () => {
    if (!selectedEndpoint) return '';
    let cmd = `curl -X ${selectedEndpoint.method} "${buildFinalUrl()}"`;
    try {
      const headers = JSON.parse(requestHeaders);
      for (const [k, v] of Object.entries(headers)) {
        cmd += ` \\\n  -H "${k}: ${v}"`;
      }
    } catch {}
    if (['POST', 'PUT', 'PATCH'].includes(selectedEndpoint.method) && requestBody.trim()) {
      try {
        const body = JSON.parse(requestBody);
        cmd += ` \\\n  -d '${JSON.stringify(body)}'`;
      } catch {}
    }
    return cmd;
  };

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} p-6`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className={`${cardBg} border ${borderColor} rounded-2xl p-8 shadow-xl`}>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Code2 size={36} /> API Explorer
            </h2>

            {/* Token Manager */}
            <div className={`mb-8 p-6 rounded-xl border ${borderColor} ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Key size={20} /> Access Token
                </h3>
                <button onClick={fetchToken} disabled={tokenLoading} className="p-2 hover:bg-gray-600/30 rounded-lg">
                  {tokenLoading ? <Loader2 size={18} className="animate-spin" /> : <RefreshCw size={18} />}
                </button>
              </div>
              {token ? (
                <div className="flex items-center gap-3">
                  <code className="text-xs font-mono bg-black/20 px-3 py-2 rounded flex-1 truncate">
                    {token}
                  </code>
                  <button onClick={() => navigator.clipboard.writeText(token)} className="p-2 hover:bg-gray-600/30 rounded">
                    <Copy size={16} />
                  </button>
                </div>
              ) : (
                <p className={`${mutedText} text-sm`}>Loading token...</p>
              )}
            </div>

            {/* Endpoints List */}
            <div className="space-y-4">
              {Object.entries(groupedEndpoints).map(([group, eps]) => (
                <div key={group}>
                  <button
                    onClick={() => toggleGroup(group)}
                    className="flex items-center gap-3 w-full text-left font-medium py-3 hover:text-blue-400"
                  >
                    {expandedGroups[group] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    <span className="font-mono text-sm">{group}</span>
                  </button>
                  {expandedGroups[group] && (
                    <div className="ml-8 mt-3 space-y-3">
                      {eps.map((ep, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setSelectedEndpoint(ep);
                            setQueryParams('');
                            setRequestBody(getSampleBody());
                            setPathParamValues({});
                            setPathParamErrors({});
                            setResponse(null);
                            setActiveTab('response');
                          }}
                          className={`block w-full text-left p-4 rounded-xl text-sm transition-all ${
                            selectedEndpoint?.path === ep.path && selectedEndpoint?.method === ep.method
                              ? `${methodColor(ep.method)} text-white font-medium`
                              : `${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <span className="font-bold text-xs w-16">{ep.method}</span>
                            <span className="font-mono text-sm">{ep.path}</span>
                          </div>
                          {ep.summary && <p className="text-xs opacity-70 mt-2">{ep.summary}</p>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Panel */}
          <div className="lg:col-span-3 space-y-8">
            {!selectedEndpoint ? (
              <div className={`${cardBg} border ${borderColor} rounded-2xl p-20 text-center shadow-xl`}>
                <Send size={80} className="mx-auto mb-6 opacity-20" />
                <p className="text-2xl text-gray-500">Select an endpoint to send a request</p>
              </div>
            ) : (
              <>
                {/* Request Bar */}
                <div className={`${cardBg} border ${borderColor} rounded-2xl p-8 shadow-xl`}>
                  <div className="flex items-center gap-6 mb-8">
                    <div className={`px-5 py-3 rounded-xl font-bold text-white ${methodColor(selectedEndpoint.method)}`}>
                      {selectedEndpoint.method}
                    </div>
                    <div className={`flex-1 px-6 py-4 rounded-xl font-mono text-sm ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} border ${borderColor}`}>
                      {buildFinalUrl()}
                    </div>
                    <button
                      onClick={handleSendRequest}
                      disabled={loading || pathParams.some(p => p.required && !pathParamValues[p.name]?.trim())}
                      className="px-10 py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-semibold flex items-center gap-3 transition"
                    >
                      {loading ? <Loader2 className="animate-spin" size={22} /> : <Send size={22} />}
                      Send
                    </button>
                  </div>

                  {/* Path Parameters */}
                  {pathParams.length > 0 && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Path Parameters</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {pathParams.map(param => (
                          <div key={param.name}>
                            <label className="block text-sm font-medium mb-2">
                              {param.name} {param.required && <span className="text-red-500">*</span>}
                            </label>
                            <input
                              type="text"
                              value={pathParamValues[param.name] || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                setPathParamValues(prev => ({ ...prev, [param.name]: val }));
                                if (param.name.toLowerCase().includes('id') && val && !/^\d+$/.test(val)) {
                                  setPathParamErrors(prev => ({ ...prev, [param.name]: 'Must be a valid integer' }));
                                } else {
                                  setPathParamErrors(prev => ({ ...prev, [param.name]: undefined }));
                                }
                              }}
                              className={`w-full px-5 py-3 rounded-xl border ${pathParamErrors[param.name] ? 'border-red-500' : borderColor} ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                            />
                            {pathParamErrors[param.name] && (
                              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                <AlertCircle size={16} /> {pathParamErrors[param.name]}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Query Parameters */}
                  {selectedEndpoint.parameters?.some(p => p.in === 'query') && (
                    <div className="mt-8">
                      <label className="block text-sm font-medium mb-2">Query Parameters</label>
                      <input
                        type="text"
                        placeholder="limit=10&status=active"
                        value={queryParams}
                        onChange={(e) => setQueryParams(e.target.value)}
                        className={`w-full px-5 py-3 rounded-xl border ${borderColor} ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                      />
                    </div>
                  )}
                </div>

                {/* Sample Request Body */}
                {selectedEndpoint.requestBody && (
                  <div className={`${cardBg} border ${borderColor} rounded-2xl p-8 shadow-xl`}>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">Sample Request Body</h3>
                      <button
                        onClick={() => setRequestBody(getSampleBody())}
                        className="text-sm text-blue-500 hover:text-blue-400 flex items-center gap-2"
                      >
                        <Copy size={16} /> Use Sample
                      </button>
                    </div>
                    <SyntaxHighlighter language="json" style={darkMode ? vscDarkPlus : prism} customStyle={{ borderRadius: '12px', fontSize: '13px' }}>
                      {getSampleBody()}
                    </SyntaxHighlighter>
                  </div>
                )}

                {/* Request Headers */}
                <div className={`${cardBg} border ${borderColor} rounded-2xl shadow-xl overflow-hidden`}>
                  <div className="p-6 border-b border-gray-700/30">
                    <h3 className="text-lg font-semibold">Request Headers</h3>
                  </div>
                  <Editor
                    height="160px"
                    defaultLanguage="json"
                    value={requestHeaders}
                    onChange={(v) => setRequestHeaders(v || '')}
                    theme={darkMode ? 'vs-dark' : 'light'}
                    options={{ minimap: { enabled: false }, fontSize: 13, wordWrap: 'on', lineNumbers: 'off' }}
                  />
                </div>

                {/* Request Body */}
                {['POST', 'PUT', 'PATCH'].includes(selectedEndpoint.method) && (
                  <div className={`${cardBg} border ${borderColor} rounded-2xl shadow-xl overflow-hidden`}>
                    <div className="p-6 border-b border-gray-700/30">
                      <h3 className="text-lg font-semibold">Request Body</h3>
                    </div>
                    <Editor
                      height="280px"
                      defaultLanguage="json"
                      value={requestBody}
                      onChange={(v) => setRequestBody(v || '')}
                      theme={darkMode ? 'vs-dark' : 'light'}
                      options={{ minimap: { enabled: false }, fontSize: 13, wordWrap: 'on' }}
                    />
                  </div>
                )}

                {/* Response */}
                {response && (
                  <div className={`${cardBg} border ${borderColor} rounded-2xl shadow-xl overflow-hidden`}>
                    <div className="p-6 border-b border-gray-700/30 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <h3 className="text-lg font-semibold">Response</h3>
                        <span className={`px-4 py-1 rounded-full text-sm font-bold ${response.status >= 400 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                          {response.status} {response.statusText}
                        </span>
                        <span className={`text-sm ${mutedText}`}>{response.timeMs}ms</span>
                      </div>
                      <button onClick={() => navigator.clipboard.writeText(JSON.stringify(response.data, null, 2))} className="flex items-center gap-2 hover:text-blue-500">
                        <Copy size={18} /> Copy
                      </button>
                    </div>

                    <div className="border-b border-gray-700/30">
                      <div className="flex">
                        <button onClick={() => setActiveTab('response')} className={`px-6 py-4 font-medium border-b-2 transition ${activeTab === 'response' ? 'border-blue-500 text-blue-500' : 'border-transparent'}`}>Body</button>
                        <button onClick={() => setActiveTab('headers')} className={`px-6 py-4 font-medium border-b-2 transition ${activeTab === 'headers' ? 'border-blue-500 text-blue-500' : 'border-transparent'}`}>Headers</button>
                        <button onClick={() => setActiveTab('curl')} className={`px-6 py-4 font-medium border-b-2 flex items-center gap-2 transition ${activeTab === 'curl' ? 'border-blue-500 text-blue-500' : 'border-transparent'}`}><Terminal size={16} /> cURL</button>
                      </div>
                    </div>

                    <div className="p-0">
                      {activeTab === 'response' && (
                        <Editor
                          height="360px"
                          language={typeof response.data === 'string' ? 'text' : 'json'}
                          value={typeof response.data === 'string' ? response.data : JSON.stringify(response.data, null, 2)}
                          theme={darkMode ? 'vs-dark' : 'light'}
                          options={{ readOnly: true, minimap: { enabled: false }, fontSize: 13, wordWrap: 'on' }}
                        />
                      )}
                      {activeTab === 'headers' && (
                        <div className="p-6 font-mono text-sm whitespace-pre">
                          {Object.entries(response.headers).map(([k, v]) => `${k}: ${v}`).join('\n')}
                        </div>
                      )}
                      {activeTab === 'curl' && (
                        <div className="p-6 bg-black/10">
                          <SyntaxHighlighter language="bash" style={darkMode ? vscDarkPlus : prism}>
                            {getCurlCommand()}
                          </SyntaxHighlighter>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
