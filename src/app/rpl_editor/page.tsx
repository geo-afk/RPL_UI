'use client';

import { useRef, useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import type * as monacoType from "monaco-editor";
import { Code, Play, X } from 'lucide-react';
import draculaTheme from "monaco-themes/themes/Dracula.json";
import toast from 'react-hot-toast'; 
import { RPL_LANGUAGE_ID, setup_rpl, updateDiagnostics } from '@/lib/antlr/rpl_setup';
import { retrieveCodeDiagnostics } from '@/lib/antlr/rpl_code_validator';
import AnalysisPanel from './component/AnalysisPanel';
import { api } from '@/lib/api';
import { PolicyResponse } from './extra/types';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

export interface PolicyEditorProps {
    darkMode: boolean;
    cardClass: string;
}

export function PolicyEditor({ darkMode, cardClass }: PolicyEditorProps) {
  const isRegistered = useRef(false);
  const [code, setCode] = useState<string>('');
  const [errors, setErrors] = useState<number>(0);

  const [analysisResponse, setAnalysisResponse] = useState<PolicyResponse>({
    message: {}
  });


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

          setErrors(err.length + warnings.length)
          
        }
      }, 300);
    });
  }, []);



  const handleRunCode = useCallback(async () => {
    toast.success('Running code...');
    try {
      const response = await api.evaluate_code(code)
      console.log(response);
      
      setAnalysisResponse(response || {message: {"info": ['No Response received']}});
    } catch (err) {
      setAnalysisResponse({message: {"error": ['Failed to retrieve analysis.']}});
    }
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
      {/* Editor Card */}
      <div className={`${cardClass} border rounded-lg overflow-hidden`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <Code className="text-blue-500 h-5 w-5" />
            <h3 className="font-semibold text-lg">policy.spl</h3>
            <span className="text-xs opacity-50">(Editable)</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleRunCode} 
              className="px-4 py-2 cursor-pointer bg-green-500 hover:bg-green-600 text-white rounded text-sm flex items-center gap-2 transition-colors disabled:opacity-50"
              disabled={errors > 0 || code.trim().length < 10}
              aria-label="Run code and get analysis"
            >
              <Play size={16} />
              Run Code
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
      <AnalysisPanel response={analysisResponse} ></AnalysisPanel>
      
    </div>
  );
}
