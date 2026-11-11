module.exports = {
  content: ['./site/index.html'],
  theme: { extend: {
    colors: {
      sand: { 50: '#FEFBF4', 100: '#FDF3E3', 200: '#F9E8C8', 300: '#F4E2BC', 400: '#EDD5A0' },
      ink: { DEFAULT: '#3D2B1F', 800: '#2C1A0A', 900: '#1A0F02' },
      gold: { 300: '#F0D080', 400: '#D4AA45', 500: '#C8922A', 700: '#A8721F', 800: '#805D1B' },
      nile: { DEFAULT: '#1A7F8E', dark: '#0D5F6E' },
      lv: { 1: '#1B5E2E', 2: '#0D7E72', 3: '#1A3A6B', 4: '#3B1A08', 5: '#7A5200' },
    },
    fontFamily: {
      cairo: ['Cairo', '"Segoe UI"', 'Tahoma', 'sans-serif'],
      messiri: ['"El Messiri"', 'Cairo', 'sans-serif'],
      cinzel: ['Cinzel', 'serif'],
    },
  } },
};
