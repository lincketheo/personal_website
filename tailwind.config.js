/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		'./public/**/*.html',
		'./src/**/*.{js,jsx,ts,tsx,vue}',
	],
	theme: {
		extend: {
			colors: {
				primary: {
					light: '#D52429',
					DEFAULT: '#D52429',
					dark: '#D52429',
				},
				'primary-variant': {
					light: '#F1602C',
					DEFAULT: '#F1602C',
					dark: '#F1602C',
				},
				secondary: {
					light: '#EC8922',
					DEFAULT: '#EC8922',
					dark: '#EC8922',
				},
				'secondary-variant': {
					light: '#EC8922',
					DEFAULT: '#EC8922',
					dark: '#EC8922',
				},
				background: {
					light: '#FEFAE5',
					DEFAULT: '#FEFAE5',
					dark: '#F1E6C7',
				},
				surface: {
					light: '#191B0E',
					DEFAULT: '#191B0E',
					dark: '#191B0E',
				},
				error: {
					light: '#B00020',
					DEFAULT: '#B00020',
					dark: '#B00020',
				},
				'on-primary': {
					light: '#FFFFFF',
					DEFAULT: '#FFFFFF',
					dark: '#FFFFFF',
				},
				'on-secondary': {
					light: '#000000',
					DEFAULT: '#000000',
					dark: '#000000',
				},
				'on-background': {
					light: '#000000',
					DEFAULT: '#000000',
					dark: '#000000',
				},
				'on-surface': {
					light: '#FEFAE5',
					DEFAULT: '#FEFAE5',
					dark: '#FEFAE5',
				},
				'on-error': {
					light: '#FFFFFF',
					DEFAULT: '#FFFFFF',
					dark: '#FFFFFF',
				},
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
};
