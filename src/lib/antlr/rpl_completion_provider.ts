import type * as monaco from "monaco-editor";


export function completionSuggestions(range: any, monacoInstance: typeof monaco) {

    return [
        {
            label: 'role',
            kind: monacoInstance.languages.CompletionItemKind.Snippet,
            insertText: 'role ${1:RoleName} {\n  permissions: [\n    {actions: [${2:read}], resources: [${3:resource}]}\n  ]\n}',
            insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Create a new role',
            range: range
        },
        {
            label: 'role extends',
            kind: monacoInstance.languages.CompletionItemKind.Snippet,
            insertText: 'role ${1:RoleName} extends ${2:ParentRole} {\n  permissions: [\n    {actions: [${3:read}], resources: [${4:resource}]}\n  ]\n}',
            insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Create a role with inheritance',
            range: range
        },
        {
            label: 'user',
            kind: monacoInstance.languages.CompletionItemKind.Snippet,
            insertText: 'user ${1:UserName} {\n  roles: [${2:role}],\n  attributes: {\n    ${3:key}: ${4:value}\n  }\n}',
            insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Create a new user',
            range: range
        },
        {
            label: 'resource',
            kind: monacoInstance.languages.CompletionItemKind.Snippet,
            insertText: 'resource ${1:ResourceName} {\n  path: "${2:/path}",\n  type: "${3:database}"\n}',
            insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Create a new resource',
            range: range
        },
        {
            label: 'group',
            kind: monacoInstance.languages.CompletionItemKind.Snippet,
            insertText: 'group ${1:GroupName} {\n  members: [${2:user}],\n  roles: [${3:role}]\n}',
            insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Create a new group',
            range: range
        },
        {
            label: 'ALLOW',
            kind: monacoInstance.languages.CompletionItemKind.Keyword,
            insertText: 'ALLOW ACTION: ${1:READ} ON RESOURCE: ${2:ResourceName}',
            insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Create an ALLOW policy rule',
            range: range
        },
        {
            label: 'DENY',
            kind: monacoInstance.languages.CompletionItemKind.Keyword,
            insertText: 'DENY ACTION: ${1:DELETE} ON RESOURCE: ${2:ResourceName}',
            insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Create a DENY policy rule',
            range: range
        },
        {
            label: 'ACTION',
            kind: monacoInstance.languages.CompletionItemKind.Keyword,
            insertText: 'ACTION: ${1:READ}',
            insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Specify actions in a policy rule',
            range: range
        },
        {
            label: 'IF',
            kind: monacoInstance.languages.CompletionItemKind.Keyword,
            insertText: 'IF (${1:condition})',
            insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Add a conditional expression',
            range: range
        },
        {
            label: 'ON',
            kind: monacoInstance.languages.CompletionItemKind.Keyword,
            insertText: 'ON RESOURCE: ${1:ResourceName}',
            insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Specify the resource target',
            range: range
        },
        {
            label: 'CAN',
            kind: monacoInstance.languages.CompletionItemKind.Keyword,
            insertText: 'can: ${1:*}',
            insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Define role permissions',
            range: range
        },

        // Logical operators
        {
            label: 'AND',
            kind: monacoInstance.languages.CompletionItemKind.Operator,
            insertText: 'AND',
            documentation: 'Logical AND operator',
            range: range
        },
        {
            label: 'OR',
            kind: monacoInstance.languages.CompletionItemKind.Operator,
            insertText: 'OR',
            documentation: 'Logical OR operator',
            range: range
        },
        {
            label: 'NOT',
            kind: monacoInstance.languages.CompletionItemKind.Operator,
            insertText: 'NOT',
            documentation: 'Logical NOT operator',
            range: range
        },

        // Actions/Permissions
        ...['read', 'write', 'execute', 'delete', 'modify', 'deploy', 'start', 'stop'].map(perm => ({
            label: perm,
            kind: monacoInstance.languages.CompletionItemKind.Keyword,
            insertText: perm,
            documentation: `Permission: ${perm}`,
            range: range
        })),
        ...['allow', 'deny', 'extends', 'permissions', 'actions', 'resources'].map(kw => ({
            label: kw,
            kind: monacoInstance.languages.CompletionItemKind.Keyword,
            insertText: kw,
            range: range
        })),

        {
            label: '*',
            kind: monacoInstance.languages.CompletionItemKind.Value,
            insertText: '*',
            documentation: 'Wildcard - all permissions',
            range: range
        },
    ]
}