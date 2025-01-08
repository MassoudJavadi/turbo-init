const { lightColors, darkColors } = require("./src/theme/colors.js");

module.exports = {
  darkMode: "class",
  content: ["../../packages/ui/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: lightColors.primary,
        secondary: lightColors.secondary,
        neutral: lightColors.neutral,
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...lightColors,
          primary: lightColors.primary[500],
          secondary: lightColors.secondary[500],
          "base-100": lightColors.background,
        },
        dark: {
          ...darkColors,
          primary: darkColors.primary[500],
          secondary: darkColors.secondary[500],
          "base-100": darkColors.background,
        },
      },
    ],
  },
};
