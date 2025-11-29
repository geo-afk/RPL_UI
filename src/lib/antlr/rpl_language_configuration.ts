export function language_configuration(): import('monaco-editor').languages.LanguageConfiguration {
    // for convenience, import the types locally
    type CharacterPair = import('monaco-editor').languages.CharacterPair;
    type IAutoClosingPair = import('monaco-editor').languages.IAutoClosingPair;

    const brackets: CharacterPair[] = [
        ['{', '}'],
        ['[', ']'],
        ['(', ')'],
    ];

    const autoClosingPairs: IAutoClosingPair[] = [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        // you can add notIn if you want e.g. { open: '`', close: '`', notIn: ['string', 'comment'] }
    ];

    const surroundingPairs: IAutoClosingPair[] = [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
    ];

    return {
        comments: {
            lineComment: '//',
        },
        brackets,
        autoClosingPairs,
        surroundingPairs,
    };
}
