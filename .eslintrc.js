module.exports = {
    root: true,
    extends: ['@react-native', 'prettier'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'off',
                'no-inline-styles': false,
                singleQuote: true,
                parser: 'flow',
            },
        ],
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'react-native/no-inline-styles': 'off',
        'eol-last': 0,
        'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
        '@typescript-eslint/no-unused-vars': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'react/no-unstable-nested-components': [
            'off' | 'warn' | 'error',
            {
                allowAsProps: true | false,
                customValidators:
                    [] /* optional array of validators used for propTypes validation */,
            },
        ],
    },
};