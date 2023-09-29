export default {
	testEnvironment: 'jest-environment-jsdom',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	transform: {
		'^.+\\.tsx?$': '@swc/jest',
	},
	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
	bail: 0,
	clearMocks: true,
	resetMocks: true,
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
	},
	watch: false,
}
