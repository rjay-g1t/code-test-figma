import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors from Figma
        'cheerful-purple': '#8B5CF6',
        'cheerful-orange': '#F59E0B',
        'cheerful-gray': '#374151',
        'cheerful-light-gray': '#F9FAFB',
        'cheerful-border': '#E5E7EB',
        // Gradient colors
        'gradient-from': '#8B5CF6',
        'gradient-to': '#F59E0B',
      },
      borderRadius: {
        '2xl': '16px',
      },
      spacing: {
        '15': '3.75rem', // 60px for sidebar
        '18': '4.5rem',
        '88': '22rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-dots': 'pulse 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
