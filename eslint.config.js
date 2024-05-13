// import globals from 'globals'
// import pluginJs from '@eslint/js'
// import tseslint from "typescript-eslint";
// import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
const rules = [
	{
		rules: {
			'no-unused-vars': 'warning',
			'no-undef': 'error',
		},
	},
	// { languageOptions: { globals: globals.browser } },
	// pluginJs.configs.recommended,
	// ...tseslint.configs.recommended,
	// pluginReactConfig,
]

export default rules
