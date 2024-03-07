/* eslint-disable linebreak-style */
module.exports = {
	env: {
		commonjs: true,
		es2021: true,
		node: true,
	},
	extends: 'airbnb-base',
	overrides: [
		{
			env: {
				node: true,
			},
			files: [
				'.eslintrc.{js,cjs}',
			],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	rules: {
		'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
		'class-methods-use-this': 'off',
		'import/no-extraneous-dependencies': 'off',
		'no-promise-executor-return': 'off',
		'consistent-return': 'off',
		camelcase: 'off',
		'no-tabs': 'off',
		'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
		indent: ['error', 'tab'],
	},
};
