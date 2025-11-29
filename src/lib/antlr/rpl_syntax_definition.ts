export function syntax_definition() {
    return {
        // Set defaultToken to invalid to see what you do not tokenize yet
        // defaultToken: 'invalid',

        keywords: [
            'role', 'user', 'resource', 'policy', 'group', 'delegation', 'config',
            'extends', 'can', 'permissions', 'actions', 'resources', 'conditions',
            'attributes', 'children', 'members', 'roles', 'from', 'to', 'duration',
            'effect', 'allow', 'deny', 'priority', 'obligations', 'if', 'and', 'or',
            'not', 'in', 'contains', 'on', 'valid_from', 'valid_until'
        ],

        typeKeywords: [
            'ROLE', 'USER', 'RESOURCE', 'GROUP',
            'role', 'user', 'resource', 'group'
        ],

        permissions: [
            'READ', 'WRITE', 'MODIFY', 'START', 'STOP', 'DEPLOY', 'DELETE', 'EXECUTE',
            'read', 'write', 'modify', 'start', 'stop', 'deploy', 'delete', 'execute'
        ],

        operators: [
            '=', '==', '!=', '<', '>', '<=', '>=', '+', '-', '*', '/', '.'
        ],

        symbols: /[=><!~?:&|+\-*\/\^%]+/,


        tokenizer: {
            root: [
                // Keywords
                [/[a-z_$][\w$]*/, {
                    cases: {
                        '@keywords': 'keyword',
                        '@permissions': 'type',
                        '@default': 'identifier'
                    }
                }],

                // Identifiers (capitalized)
                [/[A-Z][\w$]*/, 'type.identifier'],

                // Whitespace
                { include: '@whitespace' },

                // Numbers
                [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
                [/\d+/, 'number'],

                // Strings
                [/"([^"\\]|\\.)*$/, 'string.invalid'],
                [/"/, 'string', '@string'],

                // Delimiters
                [/[{}()\[\]]/, '@brackets'],
                [/[<>](?!@symbols)/, '@brackets'],
                [/@symbols/, {
                    cases: {
                        '@operators': 'operator',
                        '@default': ''
                    }
                }],

                // Delimiter: comma, colon
                [/[,:]/, 'delimiter'],
            ],

            whitespace: [
                [/[ \t\r\n]+/, ''],
                [/\/\/.*$/, 'comment'],
            ],

            string: [
                [/[^\\"]+/, 'string'],
                [/"/, 'string', '@pop']
            ],
        }
    };

}