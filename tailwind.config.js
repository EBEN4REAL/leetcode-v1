/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'yellow_bg' : "url('./lc-bg')",
      },
      colors: {
        "dark-layer-1": "rgb(40,40,40)",
        "dark-layer-2": "rgb(26,26,26)",
        "dark-label-2": "#eff1f6bf",
        "dark-divider-border-2": "rgb(61, 61, 61)",
        "dark-fill-2": "hsla(0,0%,100%,.14)",
        // "dark-fill-3": "hsla(0,0%,100%,.1)",
        "dark-gray-6": "rgb(138, 138, 138)",
        "dark-gray-7": "rgb(179, 179, 179)",
        "gray-8": "rgb(38, 38, 38)",
        "dark-gray-8": "rgb(219, 219, 219)",
        "brand-orange": "rgb(255 161 22)",
        "brand-orange-s": "rgb(193, 122, 15)",
        "dark-yellow": "rgb(255 192 30)",
        "dark-pink": "rgb(255 55 95)",
        olive: "rgb(0, 184, 163)",
        "dark-green-s": "rgb(44 187 93)",
        "dark-blue-s": "rgb(10 132 255)",
        "text-gray": "rgba(245, 245, 245, 0.75)",
        "secondary-gray": "#2A2A2A",
        "card-para": "rgba(183, 183, 183, 0.60)",
        "light-gray": "#eff1f6bf",
        "light-border": "rgba(255, 255, 255, 0.16)",
        purple: "#7e5bef",
        'input-grey': '#69696c',
        'dark-layer-3': "#ffffff1a",
        "dark-fill-4": "#ffffff12",
        "dark-fill-3": "#ffffff1a",
        "label-2": "#262626bf",
        "dark-text-gray-7": "rgb(89, 89, 89, 1)",
        "dark-overlay-3": "rgb(48, 48, 48, 1)",
        "dark-label-3": "#eff2f699",
        "label-3": "#3c3c4399",
        "label-light": "#eff1f640",
        "dark-gray-4": "rgb(74, 74, 74, 1)",
        "text-dark-label-3": " #eff2f699",
        "dark-label-4": "#ebebf54d",
        "dark-label-5": "#ebebf582",
        "fill-2": "#000a201a"
      },
    },
  },
  plugins: [],
};

