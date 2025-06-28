import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: '12px',
        '2xl': '16px',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'spin-reverse-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'ping-slow': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '75%, 100%': { transform: 'scale(2)', opacity: '0' },
        },
        'glow': {
          '0%, 100%': { opacity: '0.6', boxShadow: '0 0 15px 2px rgba(255, 107, 44, 0.5)' },
          '50%': { opacity: '1', boxShadow: '0 0 25px 5px rgba(255, 107, 44, 0.8)' },
        },
        'path-glow': {
          '0%, 100%': { filter: 'drop-shadow(0 0 3px rgba(255, 107, 44, 0.6))' },
          '50%': { filter: 'drop-shadow(0 0 8px rgba(255, 107, 44, 0.9))' },
        },
        'rotate-3d': {
          '0%': { transform: 'perspective(1200px) rotateY(0deg) rotateX(0deg)' },
          '50%': { transform: 'perspective(1200px) rotateY(180deg) rotateX(10deg)' },
          '100%': { transform: 'perspective(1200px) rotateY(360deg) rotateX(0deg)' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'spin-slow': 'spin-slow 20s linear infinite',
        'spin-reverse-slow': 'spin-reverse-slow 15s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'ping-slow': 'ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'path-glow': 'path-glow 2s ease-in-out infinite',
        'rotate-3d': 'rotate-3d 15s ease-in-out infinite',
      },
      fontFamily: {
        heading: ['Clash Display', 'sans-serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        sourcesans: ['"Source Sans Pro"', 'sans-serif'],
      },
      boxShadow: {
        'neumorphic': '-8px -8px 16px #060606, 8px 8px 16px #1E1E1E',
        'neumorphic-light': '-8px -8px 16px rgba(255,255,255,0.8), 8px 8px 16px rgba(0,0,0,0.1)',
        'glow': '0 0 25px 5px rgba(255, 107, 44, 0.5)',
      },
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;