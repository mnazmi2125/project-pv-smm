/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        vscode: {
          bg: '#1e1e1e',
          sidebar: '#252526',
          tab: '#37373d',
          accent: '#007acc',
          text: '#cccccc',
          yellow: '#dcdcaa',
          cyan: '#4fc1ff',
          green: '#6a9955',
          orange: '#ce9178',
          border: '#3c3c3c',
        },
      },
      fontFamily: {
        mono: ['"Fira Code"', 'Consolas', 'Monaco', 'monospace'],
      },
    },
  },
  plugins: [],
}
