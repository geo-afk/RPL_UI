import type * as monaco from "monaco-editor";

function extractRoleName(message: string) {
    const match = message.match(/undefined role '(\w+)'/);
    return match ? match[1] : null;
}

function extractResourceName(message: string) {
    const match = message.match(/undefined resource '(\w+)'/);
    return match ? match[1] : null;
}

export function codeActions(RPL_LANGUAGE_ID: string, monacoInstance: typeof monaco) {
    monacoInstance.languages.registerCodeActionProvider(RPL_LANGUAGE_ID, {
        provideCodeActions: (
            model: monaco.editor.ITextModel,
            range: monaco.Range,
            context: monaco.languages.CodeActionContext,
            token: monaco.CancellationToken
        ) => {
            const actions: monaco.languages.CodeAction[] = [];

            context.markers.forEach(marker => {
                // Quick fix for undefined role
                if (marker.message.includes("undefined role")) {
                    const roleName = extractRoleName(marker.message);
                    if (roleName) {
                        actions.push({
                            title: `Create role '${roleName}'`,
                            diagnostics: [marker],
                            kind: "quickfix",
                            edit: {
                                edits: [
                                    {
                                        resource: model.uri,
                                        textEdit: {
                                            range: new monacoInstance.Range(1, 1, 1, 1),
                                            text:
                                                `role ${roleName} {\n  permissions: [\n    {actions: [read], resources: [*]}\n  ]\n}\n\n`,
                                        },
                                        versionId: model.getVersionId(), // optional, but good practice
                                    },
                                ],
                            },
                            isPreferred: true,
                        });
                    }
                }

                // Quick fix for undefined resource
                if (marker.message.includes("undefined resource")) {
                    const resourceName = extractResourceName(marker.message);
                    if (resourceName) {
                        actions.push({
                            title: `Create resource '${resourceName}'`,
                            diagnostics: [marker],
                            kind: "quickfix",
                            edit: {
                                edits: [
                                    {
                                        resource: model.uri,
                                        textEdit: {
                                            range: new monacoInstance.Range(1, 1, 1, 1),
                                            text:
                                                `resource ${resourceName} {\n  path: "/data/${resourceName.toLowerCase()}",\n  type: "database"\n}\n\n`,
                                        },
                                        versionId: model.getVersionId(),
                                    },
                                ],
                            },
                            isPreferred: false,
                        });
                    }
                }

                // Quick fix for duplicate declaration
                if (marker.message.includes("already declared")) {
                    actions.push({
                        title: "Remove duplicate declaration",
                        diagnostics: [marker],
                        kind: "quickfix",
                        edit: {
                            edits: [
                                {
                                    resource: model.uri,
                                    textEdit: {
                                        range: new monacoInstance.Range(
                                            marker.startLineNumber,
                                            1,
                                            marker.endLineNumber + 1,
                                            1
                                        ),
                                        text: "",
                                    },
                                    versionId: model.getVersionId(),
                                },
                            ],
                        },
                    });
                }
            });

            // Refactoring suggestion (always available)
            const line = model.getLineContent(range.startLineNumber);
            if (line.includes("can:")) {
                const newText = line.replace(
                    /can:\s*(.+)/,
                    'permissions: [{actions: [$1], resources: [*]}]'
                );
                actions.push({
                    title: "Convert to new permissions syntax",
                    kind: "refactor",
                    edit: {
                        edits: [
                            {
                                resource: model.uri,
                                textEdit: {
                                    range: new monacoInstance.Range(
                                        range.startLineNumber,
                                        1,
                                        range.startLineNumber,
                                        line.length + 1
                                    ),
                                    text: newText,
                                },
                                versionId: model.getVersionId(),
                            },
                        ],
                    },
                });
            }

            return {
                actions,
                dispose: () => {
                    // no special cleanup needed
                },
            };
        },
    });
}
