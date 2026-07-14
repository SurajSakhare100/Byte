import type { Config } from 'tailwindcss';
export default { darkMode: 'class', content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'], theme: { extend: { colors: { ink: '#111111', surface: '#ffffff', brand: '#000000' } } }, plugins: [] } satisfies Config;
