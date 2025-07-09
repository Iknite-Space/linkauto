  // tailwind.config.js
  export const content = [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust based on your project structure
];
export const theme = {
    extend: {
        colors: {
            primary: "#01285b", // Royal blue
            secondary: "#6C7A89", // Slate gray
            accent: "#FFC107", // Amber yellow
            backgroundColor: "#F8F9FA", // Background-color
            cardBackground: "#FFFFFF", // Card background for containers tat have content
            PrimaryTextColor: "#1C1C1C", // Eerie black, 
            SecondaryTextColor: "#4F4F4F", // Dark gray
            green: "#28A745", // Green for success messages
            red: "#DC3545", // Red for error messages
        },

        fontFamily: {
            sans: ['Roboto', 'Arial', 'sans-serif'],
        },

        fontSize: {
            heading: ['24pt', { lineHeight: '1.3', fontWeight: '700' }], // Roboto Bold
            body: ['14pt', { lineHeight: '1.6', fontWeight: '400' }],    // Roboto Regular
            caption: ['12pt', { lineHeight: '1.4', fontWeight: '300' }], // Roboto Light or Regular
       },
    },
};
export const plugins = [];