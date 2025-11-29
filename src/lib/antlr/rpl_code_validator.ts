import type * as monaco from "monaco-editor";
import { Diagnostics } from "../../components/models/model";





export function retrieveCodeDiagnostics(code: string, monacoInstance: typeof monaco, editor: monaco.editor.IStandaloneCodeEditor) {

    const model = editor.getModel();

    // Simulate semantic analysis (in real app, you'd call your Python backend)
    const diagnostics = analyzeCode(code);

    // Convert to Monaco markers
    const markers = diagnostics.map(diag => ({
        severity: diag.severity === 'error'
            ? monacoInstance.MarkerSeverity.Error
            : monacoInstance.MarkerSeverity.Warning,
        startLineNumber: diag.line,
        startColumn: diag.column || 1,
        endLineNumber: diag.line,
        endColumn: diag.endColumn || 1000,
        message: diag.message,
        source: 'RPL Semantic Analyzer'
    }));

    // Set markers
    if (!model) {
        return;
    }
    monacoInstance.editor.setModelMarkers(model, 'rpl', markers);

}



function analyzeCode(code: string) {
    const diagnostics: Diagnostics[] = [];
    const lines = code.split('\n');

    // Track declarations
    const roles = new Set();
    const users = new Set();
    const resources = new Set();

    lines.forEach((line, index) => {
        const lineNum = index + 1;
        const trimmed = line.trim();

        // Check for role declarations
        if (trimmed.startsWith('role ')) {
            const match = trimmed.match(/role\s+(\w+)/);
            if (match) {
                const roleName = match[1];
                if (roles.has(roleName)) {
                    diagnostics.push({
                        severity: 'error',
                        line: lineNum,
                        column: line.indexOf('role') + 1,
                        endColumn: line.indexOf(roleName) + roleName.length + 1,
                        message: `Role '${roleName}' already declared`
                    });
                }
                roles.add(roleName);

                // Check for extends reference
                if (trimmed.includes('extends')) {
                    const extendsMatch = trimmed.match(/extends\s+(\w+)/);
                    if (extendsMatch) {
                        const parentRole = extendsMatch[1];
                        if (!roles.has(parentRole)) {
                            diagnostics.push({
                                severity: 'error',
                                line: lineNum,
                                column: line.indexOf(parentRole) + 1,
                                endColumn: line.indexOf(parentRole) + parentRole.length + 1,
                                message: `Role '${roleName}' extends undefined role '${parentRole}'`
                            });
                        }
                    }
                }
            }
        }

        // Check for user declarations
        if (trimmed.startsWith('user ')) {
            const match = trimmed.match(/user\s+(\w+)/);
            if (match) {
                const userName = match[1];
                if (users.has(userName)) {
                    diagnostics.push({
                        severity: 'error',
                        line: lineNum,
                        message: `User '${userName}' already declared`
                    });
                }
                users.add(userName);
            }
        }

        // Check for resource declarations
        if (trimmed.startsWith('resource ')) {
            const match = trimmed.match(/resource\s+(\w+)/);
            if (match) {
                const resourceName = match[1];
                if (resources.has(resourceName)) {
                    diagnostics.push({
                        severity: 'error',
                        line: lineNum,
                        message: `Resource '${resourceName}' already declared`
                    });
                }
                resources.add(resourceName);
            }
        }

        // Check for role references in users
        if (trimmed.includes('roles:')) {
            const roleRefs = trimmed.match(/roles:\s*\[([^\]]+)\]/);
            if (roleRefs) {
                const roleList = roleRefs[1].split(',').map(r => r.trim());
                roleList.forEach(role => {
                    if (!roles.has(role)) {
                        diagnostics.push({
                            severity: 'error',
                            line: lineNum,
                            message: `References undefined role '${role}'`
                        });
                    }
                });
            }
        }

        // Check for resource references in policies
        if (trimmed.includes('resources:')) {
            const resRefs = trimmed.match(/resources:\s*\[([^\]]+)\]/);
            if (resRefs) {
                const resList = resRefs[1].split(',').map(r => r.trim());
                resList.forEach(res => {
                    if (res !== '*' && !resources.has(res)) {
                        diagnostics.push({
                            severity: 'warning',
                            line: lineNum,
                            message: `Policy references undefined resource '${res}'`
                        });
                    }
                });
            }
        }

        // Check for missing colons
        if (trimmed.match(/^(role|user|resource|policy|group)\s+\w+\s*\{/) &&
            !trimmed.includes(':') && lines[index + 1] && !lines[index + 1].includes(':')) {
            diagnostics.push({
                severity: 'warning',
                line: lineNum,
                message: 'Declaration may be missing property definitions'
            });
        }
    });

    return diagnostics;
}