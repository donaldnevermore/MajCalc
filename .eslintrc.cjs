module.exports = {
    root: true,
    extends: "@react-native-community",
    rules: {
        "prettier/prettier": "off",

        indent: ["warn", 4, { SwitchCase: 0 }],
        semi: ["warn", "never"],
        quotes: ["warn", "double"],
        "brace-style": ["warn", "stroustrup"],
        "linebreak-style": ["warn", "unix"],

        "@typescript-eslint/no-shadow": ["warn"],
        "no-shadow": "off",
        "no-undef": "off",
        "no-unused-vars": "warn",
        "@typescript-eslint/no-unused-vars": "warn",
        "comma-dangle": ["warn", "never"]
    },
    ignorePatterns: ["src/lib/*.ts"]
}
