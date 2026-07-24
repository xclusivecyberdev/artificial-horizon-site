/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B1220",
        dusk: "#101B2D",
        panel: "#16223A",
        sky: "#1D3557",
        skylight: "#3A6EA5",
        ground: "#9C6B3E",
        grounddeep: "#6E4A29",
        bone: "#F3EEE2",
        chalk: "#F8F5EC",
        signal: "#E0A253",
        alert: "#C1443C",
        mist: "#8A94A6",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grain": "radial-gradient(circle at 1px 1px, rgba(243,238,226,0.06) 1px, transparent 0)",
      },
      boxShadow: {
        instrument: "0 0 0 1px rgba(243,238,226,0.08), 0 20px 60px -20px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};
