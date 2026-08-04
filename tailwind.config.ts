import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        han: ['"Noto Sans SC"', '"PingFang SC"', '"Hiragino Sans GB"', 'system-ui', 'sans-serif'],
        'han-serif': ['"Noto Serif SC"', '"Songti SC"', '"STSong"', 'serif'],
        display: ['Fraunces', '"Iowan Old Style"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        paper: '#f6f1e6',
        paper2: '#efe7d4',
        ink: '#14181f',
        ink2: '#3b4048',
        muted: '#877e6f',
        rule: '#e2d7bf',
        accent: {
          DEFAULT: '#b21414',
          dark: '#7a0f0f',
          soft: '#f4e0e0',
        },
        amber: {
          DEFAULT: '#b45309',
        },
      },
      letterSpacing: {
        widest2: '0.22em',
      },
    },
  },
  plugins: [],
};

export default config;
