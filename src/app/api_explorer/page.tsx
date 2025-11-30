'use client';
import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import {
  ChevronRight,
  ChevronDown,
  Send,
  Loader2,
  Terminal,
  Code2,
  Info,
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, prism } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { api, API_BASE } from '@/lib/api';

interface RawEndpoint {
  name: string;
  summary: string;
  description?: string;
  methods: string[];
  path: string;
  path_params: string[];
  query_params: string[];
  body_model_schema?: string | null;
  response_model_schema?: string | null;
  tags: string[];
  status_code: number;
}

interface ParsedEndpoint {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  summary: string;
  description?: string;
  pathParams: string[];
  queryParams: string[];
  requestBodySchema?: any;
  responseSchema?: any;
  statusCode: number;
  tag: string;
}

type ActiveTab = 'response' | 'headers' | 'curl';

export function ApiExplorer({ darkMode = false }: { darkMode?: boolean }) {
  const [endpoints, setEndpoints] = useState<ParsedEndpoint[]>([]);
  const [selectedEndpoint, setSelectedEndpoint] = useState<ParsedEndpoint | null>(null);
  const [expandedTags, setExpandedTags] = useState<Record<string, boolean>>({});
  const [requestBody, setRequestBody] = useState('{}');
  const [pathParamValues, setPathParamValues] = useState<Record<string, string>>({});
  const [pathParamErrors, setPathParamErrors] = useState<Record<string, string | undefined>>({});
  const [queryParamInputs, setQueryParamInputs] = useState<Record<string, string>>({});
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('response');

  // Fetch endpoints
  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.fetchEndpoints();
        
        if (data && Array.isArray(data)) {
          const parsed: ParsedEndpoint[] = [];
          data.forEach((ep: RawEndpoint) => {
            const tag = ep.tags[0] || 'Uncategorized';

            ep.methods.forEach((method: string) => {
              let requestBodySchema = null;
              let responseSchema = null;

              if (ep.body_model_schema && ep.body_model_schema !== 'null') {
                try {
                  requestBodySchema = JSON.parse(ep.body_model_schema.replace(/\\n/g, ' ').trim());
                } catch {
                  // Handle parse error silently
                }
              }

              if (ep.response_model_schema && !ep.response_model_schema.includes('error:')) {
                try {
                  responseSchema = JSON.parse(ep.response_model_schema.replace(/\\n/g, ' ').trim());
                } catch {
                  // Handle parse error silently
                }
              }

              parsed.push({
                path: ep.path,
                method: method as 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
                summary: ep.summary,
                description: ep.description,
                pathParams: ep.path_params,
                queryParams: ep.query_params,
                requestBodySchema,
                responseSchema,
                statusCode: ep.status_code,
                tag,
              });
            });
          });

          setEndpoints(parsed);
        }
      } catch (err) {
        console.error('Failed to load endpoints', err);
      }
    };

    load();
  }, []);


  // Group by tag
  const grouped = endpoints.reduce((acc, ep) => {
    if (!acc[ep.tag]) acc[ep.tag] = [];
    acc[ep.tag].push(ep);
    return acc;
  }, {} as Record<string, ParsedEndpoint[]>);

  const buildUrl = () => {
    
    if (!selectedEndpoint) return '';
    let url = selectedEndpoint.path;
    selectedEndpoint.pathParams.forEach((p) => {
      url = url.replace(`{${p}}`, encodeURIComponent(pathParamValues[p] || `{${p}}`));
    });
    const qs = Object.entries(queryParamInputs)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join('&');
    return `${API_BASE}${qs}` ? `${API_BASE}${url}?${qs}` : url;
  };

  const generateSampleBody = () => {
    if (!selectedEndpoint?.requestBodySchema?.properties) return '{}';
    const sample: Record<string, any> = {};
    Object.entries(selectedEndpoint.requestBodySchema.properties).forEach(([key, val]: [string, any]) => {
      if (val.example !== undefined) sample[key] = val.example;
      else if (val.default !== undefined) sample[key] = val.default;
      else if (val.enum) sample[key] = val.enum[0];
      else if (val.type === 'string') sample[key] = '';
      else if (val.type === 'integer') sample[key] = 0;
      else if (val.type === 'boolean') sample[key] = false;
      else sample[key] = null;
    });
    return JSON.stringify(sample, null, 2);
  };

  const handleSend = async () => {
    if (!selectedEndpoint) return;

    // Validate path parameters
    for (const p of selectedEndpoint.pathParams) {
      const v = pathParamValues[p]?.trim();
      if (!v) {
        setPathParamErrors((e) => ({ ...e, [p]: 'Required' }));
        return;
      }
      if (p.includes('id') && !/^\d+$/.test(v)) {
        setPathParamErrors((e) => ({ ...e, [p]: 'Must be a number' }));
        return;
      }
      setPathParamErrors((e) => ({ ...e, [p]: undefined }));
    }

    setLoading(true);
    setResponse(null);

    try {
      let body = null;
      if (['POST', 'PUT', 'PATCH'].includes(selectedEndpoint.method)) {
        body = JSON.parse(requestBody);
      }

      const res = await fetch(buildUrl(), {
        method: selectedEndpoint.method,
        body: body ? JSON.stringify(body) : undefined,
      });

      let data: any;
      try {
        data = await res.json();
      } catch {
        data = await res.text();
      }

      const hdrs: Record<string, string> = {};
      res.headers.forEach((v, k) => {
        hdrs[k] = v;
      });

      setResponse({
        status: res.status,
        statusText: res.statusText,
        data,
        headers: hdrs,
        timeMs: Date.now() - performance.now(),
      });
    } catch (err: any) {
      setResponse({ status: 0, data: { error: err.message } });
    } finally {
      setLoading(false);
    }
  };

  const methodColor = (m: string) => {
    const map: Record<string, string> = {
      GET: 'bg-emerald-600',
      POST: 'bg-blue-600',
      PUT: 'bg-amber-600',
      PATCH: 'bg-amber-600',
      DELETE: 'bg-red-600',
    };
    return map[m] || 'bg-gray-600';
  };

  const bg = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const card = darkMode ? 'bg-gray-800' : 'bg-white';
  const border = darkMode ? 'border-gray-700' : 'border-gray-200';
  const text = darkMode ? 'text-gray-100' : 'text-gray-900';

  const curl = selectedEndpoint
  ? `curl -X ${selectedEndpoint.method} "${buildUrl()}"${
      requestBody && requestBody.trim() !== '{}'
        ? " \\\n  -d '" + requestBody.replace(/'/g, "\\'") + "'"
        : ''
    }`
  : '';


  return (
    <div className={`min-h-screen ${bg} ${text} p-6`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className={`${card} border ${border} rounded-2xl p-8 shadow-xl`}>
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Code2 size={36} /> API Explorer
          </h2>

          <div className="space-y-3">
            {Object.entries(grouped).map(([tag, eps]) => (
              <div key={tag}>
                <button
                  onClick={() => setExpandedTags((t) => ({ ...t, [tag]: !t[tag] }))}
                  className="flex items-center gap-3 w-full text-left font-semibold py-2 hover:text-blue-400"
                >
                  {expandedTags[tag] ? <ChevronDown /> : <ChevronRight />}
                  <span>{tag}</span>
                  <span className="ml-auto text-xs opacity-60">{eps.length}</span>
                </button>

                {expandedTags[tag] && (
                  <div className="ml-8 mt-2 space-y-2">
                    {eps.map((ep, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setSelectedEndpoint(ep);
                          setPathParamValues({});
                          setQueryParamInputs({});
                          setRequestBody(generateSampleBody());
                          setResponse(null);
                        }}
                        className={`block w-full text-left p-3 rounded-lg text-sm transition-all ${
                          selectedEndpoint === ep
                            ? `${methodColor(ep.method)} text-white font-medium`
                            : darkMode
                            ? 'hover:bg-gray-700'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-xs w-14">{ep.method}</span>
                          <span className="font-mono text-xs">{ep.path}</span>
                        </div>
                        <p className="text-xs opacity-70 mt-1">{ep.summary}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main */}
        <div className="lg:col-span-3 space-y-8">
          {!selectedEndpoint ? (
            <div className={`${card} border ${border} rounded-2xl p-20 text-center`}>
              <Send size={80} className="mx-auto mb-6 opacity-20" />
              <p className="text-2xl text-gray-500">Select an endpoint</p>
            </div>
          ) : (
            <>
              {/* Request Bar */}
              <div className={`${card} border ${border} rounded-2xl p-8 shadow-xl`}>
                <div className="flex items-center gap-6 mb-8">
                  <div
                    className={`px-6 py-3 rounded-xl font-bold text-white ${methodColor(
                      selectedEndpoint.method
                    )}`}
                  >
                    {selectedEndpoint.method}
                  </div>
                  <div
                    className={`flex-1 px-6 py-4 rounded-xl font-mono text-sm ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-100'
                    } border ${border}`}
                  >
                    {buildUrl()}
                  </div>
                  <button
                    onClick={handleSend}
                    disabled={loading}
                    className="px-10 py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-semibold flex items-center gap-3"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : <Send size={22} />}
                    Send
                  </button>
                </div>

                {/* Path Params */}
                {selectedEndpoint.pathParams.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Info size={18} /> Path Parameters
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedEndpoint.pathParams.map((p) => (
                        <div key={p}>
                          <label className="block text-sm font-medium mb-2">{p} *</label>
                          <input
                            type="text"
                            value={pathParamValues[p] || ''}
                            onChange={(e) =>
                              setPathParamValues((v) => ({ ...v, [p]: e.target.value }))
                            }
                            className={`w-full px-4 py-3 rounded-xl border ${
                              pathParamErrors[p] ? 'border-red-500' : border
                            } ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                          />
                          {pathParamErrors[p] && (
                            <p className="text-red-500 text-xs mt-1">{pathParamErrors[p]}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Query Params */}
                {selectedEndpoint.queryParams.length > 0 && (
                  <div className="mt-8 space-y-4">
                    <h3 className="font-semibold">Query Parameters</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedEndpoint.queryParams.map((p) => (
                        <div key={p}>
                          <label className="block text-sm font-medium mb-2">{p}</label>
                          <input
                            type="text"
                            value={queryParamInputs[p] || ''}
                            onChange={(e) =>
                              setQueryParamInputs((v) => ({ ...v, [p]: e.target.value }))
                            }
                            className={`w-full px-4 py-3 rounded-xl border ${border} ${
                              darkMode ? 'bg-gray-700' : 'bg-gray-50'
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Request Body */}
              {selectedEndpoint.requestBodySchema && (
                <div className={`${card} border ${border} rounded-2xl shadow-xl overflow-hidden`}>
                  <div className="p-6 border-b border-gray-700/30 flex justify-between">
                    <h3 className="font-semibold">Request Body</h3>
                    <button
                      onClick={() => setRequestBody(generateSampleBody())}
                      className="text-sm text-blue-500 hover:underline"
                    >
                      Use Sample
                    </button>
                  </div>
                  <Editor
                    height="300px"
                    defaultLanguage="json"
                    value={requestBody}
                    onChange={(v) => setRequestBody(v || '{}')}
                    theme={darkMode ? 'vs-dark' : 'light'}
                    options={{ minimap: { enabled: false }, fontSize: 13, wordWrap: 'on' }}
                  />
                </div>
              )}

              {/* Response */}
              {response && (
                <div className={`${card} border ${border} rounded-2xl shadow-xl overflow-hidden`}>
                  <div className="p-6 border-b border-gray-700/30 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <h3 className="font-semibold">Response</h3>
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-bold ${
                          response.status >= 400
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-green-500/20 text-green-400'
                        }`}
                      >
                        {response.status} {response.statusText}
                      </span>
                    </div>
                  </div>
                  <div className="border-b border-gray-700/30">
                    <div className="flex">
                      <button
                        onClick={() => setActiveTab('response')}
                        className={`px-6 py-4 font-medium border-b-2 ${
                          activeTab === 'response' ? 'border-blue-500 text-blue-500' : ''
                        }`}
                      >
                        Body
                      </button>
                      <button
                        onClick={() => setActiveTab('headers')}
                        className={`px-6 py-4 font-medium border-b-2 ${
                          activeTab === 'headers' ? 'border-blue-500 text-blue-500' : ''
                        }`}
                      >
                        Headers
                      </button>
                      <button
                        onClick={() => setActiveTab('curl')}
                        className={`px-6 py-4 font-medium border-b-2 flex items-center gap-2 ${
                          activeTab === 'curl' ? 'border-blue-500 text-blue-500' : ''
                        }`}
                      >
                        <Terminal size={16} /> cURL
                      </button>
                    </div>
                  </div>
                  {activeTab === 'response' && (
                    <Editor
                      height="400px"
                      language="json"
                      value={
                        typeof response.data === 'object'
                          ? JSON.stringify(response.data, null, 2)
                          : response.data
                      }
                      theme={darkMode ? 'vs-dark' : 'light'}
                      options={{ readOnly: true, minimap: { enabled: false }, fontSize: 13 }}
                    />
                  )}
                  {activeTab === 'headers' && (
                    <div className="p-6 font-mono text-sm whitespace-pre">
                      {Object.entries(response.headers || {})
                        .map(([k, v]) => `${k}: ${v}`)
                        .join('\n')}
                    </div>
                  )}
                  {activeTab === 'curl' && (
                    <div className="p-6 bg-black/10">
                      <SyntaxHighlighter language="bash" style={darkMode ? vscDarkPlus : prism}>
                        {curl}
                      </SyntaxHighlighter>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}