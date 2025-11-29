import type * as monaco from "monaco-editor";
import { syntax_definition } from "./rpl_syntax_definition";
import { language_configuration } from "./rpl_language_configuration";
import { hoverDocs } from "./rpl_hover_provider";
import { completionSuggestions } from "./rpl_completion_provider";
import { parseCode } from "./rpl_error_handler";
import { codeActions } from "./rpl_code_actions";



export const RPL_LANGUAGE_ID = 'rpl';

export function setup(monacoInstance: typeof monaco) { }


export function setup_rpl(monacoInstance: typeof monaco) {

    monacoInstance.languages.register({ id: RPL_LANGUAGE_ID })


    monacoInstance.languages.setMonarchTokensProvider(RPL_LANGUAGE_ID, syntax_definition() as monaco.languages.IMonarchLanguage)

    monacoInstance.languages.setLanguageConfiguration(RPL_LANGUAGE_ID, language_configuration())


    const hover: Record<string, string> = hoverDocs();


    monacoInstance.languages.registerHoverProvider(RPL_LANGUAGE_ID, {
        provideHover: (model, position) => {
            const word = model.getWordAtPosition(position);
            if (!word) return null;

            const docs = hover[word.word.toLowerCase()] || hover[word.word];
            if (!docs) return null;

            return {
                range: new monacoInstance.Range(
                    position.lineNumber,
                    word.startColumn,
                    position.lineNumber,
                    word.endColumn
                ),
                contents: [
                    { value: `**${word.word.toUpperCase()}**` },
                    { value: docs }
                ]
            };
        }
    });



    monacoInstance.languages.registerCompletionItemProvider(RPL_LANGUAGE_ID, {

        provideCompletionItems: (model: monaco.editor.ITextModel, position: monaco.Position) => {


            const word = model.getWordUntilPosition(position);
            const range = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: word.startColumn,
                endColumn: word.endColumn
            };


            const suggestions = completionSuggestions(range, monacoInstance)


            return { suggestions }
        }



    })


    codeActions(RPL_LANGUAGE_ID, monacoInstance)




    // let validationTimeout;
    // monacoInstance.editor.create().onDidChangeModelContent(() => {
    //     clearTimeout(validationTimeout);
    //     validationTimeout = setTimeout(() => {
    //         validateCode();
    //     }, 1000);
    // })

    // validateCode()
}


export function updateDiagnostics(code: string, monaco: any) {
    const errors = parseCode(code);

    const markers = errors.map(err => ({
        severity: monaco.MarkerSeverity.Error,
        startLineNumber: err.line,
        startColumn: err.column + 1,
        endLineNumber: err.line,
        endColumn: err.column + 2,
        message: err.message
    }));

    const model = monaco.editor.getModels && monaco.editor.getModels()[0];
    if (model) {
        monaco.editor.setModelMarkers(model, 'antlr', markers);
    }
}



// function register_theme(monacoInstance: typeof monaco) {
//     monacoInstance.editor.defineTheme('rpl-theme', {
//         base: 'vs-dark',
//         inherit: true,
//         rules: [
//             { token: 'keyword', foreground: 'C586C0', fontStyle: 'bold' },
//             { token: 'type', foreground: '4EC9B0' },
//             { token: 'identifier', foreground: '9CDCFE' },
//             { token: 'number', foreground: 'B5CEA8' },
//             { token: 'number.float', foreground: 'B5CEA8' },
//             { token: 'string', foreground: 'CE9178' },
//             { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
//             { token: 'operator', foreground: 'D4D4D4' },
//             { token: 'delimiter', foreground: 'D4D4D4' },
//         ],
//         colors: {}
//     })
// }