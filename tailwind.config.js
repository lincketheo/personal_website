/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        './public/**/*.html',
        './src/**/*.{js,jsx,ts,tsx,vue}',
    ],
    theme: {
        extend: {
            colors: {
                'primary' : {
                    light: '#6200EE',
                    DEFAULT: '#6200EE',
                    dark: '#BB86FC'
                },
                'primary-variant' : {
                    light: '#3700B3',
                    DEFAULT: '#3700B3',
                    dark: '#3700B3'
                },
                'secondary' : {
                    light: '#03DAC6',
                    DEFAULT: '#03DAC6',
                    dark: '#03DAC6'
                },
                'secondary-variant' : {
                    light: '#018786',
                    DEFAULT: '#018786',
                    dark: '#03DAC6'
                },
                'background' : {
                    light: '#FFFFFF',
                    DEFAULT: '#FFFFFF',
                    dark: '#121212'
                },
                'surface' : {
                    light: '#F5F5F5',
                    DEFAULT: '#F5F5F5',
                    dark: '#1A202C'
                },
                'error' : {
                    light: '#B00020',
                    DEFAULT: '#B00020',
                    dark: '#CF6679'
                },
                'on-primary' : {
                    light: '#FFFFFF',
                    DEFAULT: '#FFFFFF',
                    dark: '#000000'
                },
                'on-secondary' : {
                    light: '#000000',
                    DEFAULT: '#000000',
                    dark: '#000000'
                },
                'on-background' : {
                    light: '#000000',
                    DEFAULT: '#000000',
                    dark: '#FFFFFF'
                },
                'on-surface' : {
                    light: '#333333',
                    DEFAULT: '#333333',
                    dark: '#E2E8F0'
                },
                'on-error' : {
                    light: '#FFFFFF',
                    DEFAULT: '#FFFFFF',
                    dark: '#000000'
                },
            }
        },
    },
    plugins: [
        require("@tailwindcss/typography")
    ],
}
