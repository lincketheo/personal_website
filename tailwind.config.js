/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        './public/**/*.html',
        './src/**/*.{js,jsx,ts,tsx,vue}',
    ],
    theme: {
        extend: {},
        colors: {
            primary: '#166534',
            background: '#121212',
            onBackground: "white",
            cuBoulderGold: "#CFB87C",
            cuBoulderBlack: "#000000",
            cuBoulderDarkGray: "#565A5C",
            cuBoulderLightGray: "#A2A4A3",
            androidGreen: "#3DDC84",
            iphoneSilver: "#9BB5CE",
            springBootGreen: "#00ff7f",
            vueGreen: "#42b883",
            appliedMathBlue: "#29c5f6"
        },
    },
    plugins: [],
}
