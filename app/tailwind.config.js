  // tailwind.config.js
  export const content = [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust based on your project structure
];
export const theme = {
    extend: {
        colors: {
            primary: "#0077cc", // Example primary color
            secondary: "#ff5722", // Example secondary color
            background: "#f0f0f0", // Example background color
            textColor: "#333333", // Example text color
        },
        fontFamily: {
            sans: ["Arial", "sans-serif"],
            serif: ["Georgia", "serif"],
            mono: ["Courier New", "monospace"],
        },
    },
};
export const plugins = [];