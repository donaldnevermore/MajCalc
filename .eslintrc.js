module.exports = {
    root: true,
    extends: "@react-native-community",
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    overrides: [
        {
            files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
            rules: {
                "@typescript-eslint/no-shadow": ["warn"],
                "no-shadow": "off",
                "no-undef": "off",

                "no-unused-vars": "warn",
                "@typescript-eslint/no-unused-vars": "warn",
                quotes: ["warn", "double"],
                "comma-dangle": ["warn", "never"],
                semi: ["warn", "never"]
            }
        }
    ]
}
