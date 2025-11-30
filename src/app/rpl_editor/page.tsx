'use client';

import { useRef, useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import type * as monacoType from "monaco-editor";
import { Code, Play, Brain, Loader2 } from 'lucide-react';
import draculaTheme from "monaco-themes/themes/Dracula.json";
import toast from 'react-hot-toast'; 
import { RPL_LANGUAGE_ID, setup_rpl, updateDiagnostics } from '@/lib/antlr/rpl_setup';
import { retrieveCodeDiagnostics } from '@/lib/antlr/rpl_code_validator';
import AnalysisPanel from './component/AnalysisPanel';
import { api } from '@/lib/api';
import { PolicyResponse, Finding } from './extra/types';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

export interface PolicyEditorProps {
    darkMode: boolean;
    cardClass: string;
}



export function PolicyEditor({ darkMode, cardClass }: PolicyEditorProps) {
  const isRegistered = useRef(false);
  const [code, setCode] = useState<string>('');
  const [errors, setErrors] = useState<number>(0);
  
  const [analysisResponse, setAnalysisResponse] = useState<any>(null);

  const [isRunning, setIsRunning] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleEditorWillMount = useCallback((monaco: any) => {
    if (!isRegistered.current) {
      setup_rpl(monaco);
      isRegistered.current = true;
    }
    monaco.editor.defineTheme("dracula", draculaTheme);
  }, []);
  
  const handleEditorMount = useCallback((editor: any, monaco: any) => {
    let timeout: any;
    editor.onDidChangeModelContent(() => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        updateDiagnostics(editor.getValue(), monaco);
        retrieveCodeDiagnostics(editor.getValue(), monaco, editor);

        const model = editor.getModel();
        if (model) {
          const markers: monacoType.editor.IMarker[] = monaco.editor.getModelMarkers({ resource: model.uri });
          const err = markers.filter(m => m.severity === monaco.MarkerSeverity.Error);
          const warnings = markers.filter(m => m.severity === monaco.MarkerSeverity.Warning);
          setErrors(err.length + warnings.length);
        }
      }, 300);
    });
  }, []);

  const handleRunCode = useCallback(async () => {
    if (!code.trim()) {
      toast.error("Policy is empty");
      return;
    }

    setIsRunning(true);
    toast.loading('Running policy...', { id: 'run' });

    try {
      const response = await api.evaluate_code(code);
      
      // Ensure response matches PolicyResponse interface
      const safeResponse: PolicyResponse = {
        findings: Array.isArray(response?.findings) ? response.findings : [],
        risk_score: typeof response?.risk_score === 'number' ? response.risk_score : 0
      };

      setAnalysisResponse(safeResponse);
      toast.success('Policy executed successfully!', { id: 'run' });
    } catch (err: any) {
      toast.error('Failed to run policy', { id: 'run' });

      const errorFinding: Finding = {
        line: 0,
        risk_score: 100,
        description: err?.message || 'Policy execution failed',
        recommendation: 'Check your policy syntax and server logs.'
      };

      setAnalysisResponse({
        findings: [errorFinding],
        risk_score: 100
      });
    } finally {
      setIsRunning(false);
    }
  }, [code]);

  const handleGetAIAnalysis = useCallback(async () => {
    // if (!code.trim()) {
    //   toast.error("Policy is empty");
    //   return;
    // }

    // setIsAnalyzing(true);
    // toast.loading('Getting AI analysis...', { id: 'ai' });

    // try {
    //   const response = await api.analyze_policy_with_ai({ policy_code: code });

    //   const safeResponse: PolicyResponse = {
    //     findings: Array.isArray(response?.findings) 
    //       ? response.findings.map((f: any): Finding => ({
    //           line: Number(f.line) || 0,
    //           risk_score: Number(f.risk_score) || 50,
    //           description: String(f.description || 'No description'),
    //           recommendation: String(f.recommendation || 'No recommendation')
    //         }))
    //       : [],
    //     risk_score: Number(response?.risk_score) || 0
    //   };

    //   setAnalysisResponse(safeResponse);
    //   toast.success('AI analysis complete!', { id: 'ai' });
    // } catch (err: any) {
    //   toast.error('AI analysis failed', { id: 'ai' });

    //   const errorFinding: Finding = {
    //     line: 0,
    //     risk_score: 75,
    //     description: 'AI analysis failed',
    //     recommendation: err?.message || 'Please try again later.'
    //   };

    //   setAnalysisResponse({
    //     findings: [errorFinding],
    //     risk_score: 75
    //   });
    // } finally {
    //   setIsAnalyzing(false);
    // }
  }, [code]);

  const monacoTheme = darkMode ? 'dracula' : 'vs';

  const editorOptions = {
    minimap: { enabled: false },
    fontSize: 15,
    wordWrap: 'on' as const,
    automaticLayout: true,
    scrollBeyondLastLine: false,
    renderWhitespace: 'boundary' as const,
    lineNumbers: 'on' as const,
    lineDecorationsWidth: 20,
    tabSize: 2,
    accessibilitySupport: 'auto' as const,
  };

  return (
    <div className="space-y-4">
      <div className={`${cardClass} border rounded-lg overflow-hidden`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <Code className="text-blue-500 h-5 w-5" />
            <h3 className="font-semibold text-lg">policy.spl</h3>
            <span className="text-xs opacity-50">(Editable)</span>
            {errors > 0 && (
              <span className="ml-2 text-xs text-red-400">
                {errors} issue{errors > 1 ? 's' : ''}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleGetAIAnalysis}
              disabled={isAnalyzing || isRunning || !code.trim()}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded text-sm flex items-center gap-2 transition-all disabled:cursor-not-allowed"
            >
              {isAnalyzing ? <Loader2 size={16} className="animate-spin" /> : <Brain size={16} />}
              {isAnalyzing ? 'Analyzing...' : 'AI Analysis'}
            </button>

            <button 
              onClick={handleRunCode}
              disabled={isRunning || isAnalyzing || errors > 0 || !code.trim()}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white rounded text-sm flex items-center gap-2 transition-all disabled:cursor-not-allowed"
            >
              {isRunning ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
              {isRunning ? 'Running...' : 'Run Code'}
            </button>
          </div>
        </div>

        <div className="h-[80vh]">
          <MonacoEditor
            height="100%"
            language={RPL_LANGUAGE_ID}
            theme={monacoTheme}
            beforeMount={handleEditorWillMount}
            onMount={handleEditorMount}
            value={code}
            onChange={(value) => setCode(value || '')}
            options={editorOptions}
          />
        </div>
      </div>

      <AnalysisPanel response={analysisResponse} />
    </div>
  );
}