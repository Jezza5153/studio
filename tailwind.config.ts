import type { Config } from 'tailwindcss';
const { fontFamily } = require("tailwindcss/defaultTheme")

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--font-inter)", ...fontFamily.sans],
        headline: ["var(--font-playfair-display)", ...fontFamily.serif],
        code: ['monospace'],
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
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 8px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '50%': { transform: 'scale(1.08) translate(-1%, -1%)' },
          '100%': { transform: 'scale(1) translate(0, 0)' },
        },
        'ken-burns-subtle': {
          '0%': { transform: 'scale(1.02) translate(0, 0)' },
          '50%': { transform: 'scale(1.06) translate(-0.5%, -0.5%)' },
          '100%': { transform: 'scale(1.02) translate(0, 0)' },
        },
        // Drift right: slow pan from left to right
        'ken-burns-drift-right': {
          '0%': { transform: 'scale(1.05) translate(-2%, 0)' },
          '50%': { transform: 'scale(1.1) translate(1%, -0.5%)' },
          '100%': { transform: 'scale(1.05) translate(-2%, 0)' },
        },
        // Drift left: slow pan from right to left
        'ken-burns-drift-left': {
          '0%': { transform: 'scale(1.06) translate(1.5%, -0.3%)' },
          '50%': { transform: 'scale(1.1) translate(-1.5%, 0.3%)' },
          '100%': { transform: 'scale(1.06) translate(1.5%, -0.3%)' },
        },
        // Drift down: slow descend
        'ken-burns-drift-down': {
          '0%': { transform: 'scale(1.08) translate(0, -1.5%)' },
          '50%': { transform: 'scale(1.04) translate(-0.5%, 1%)' },
          '100%': { transform: 'scale(1.08) translate(0, -1.5%)' },
        },
        // Drift diagonal: diagonal crawl for variety
        'ken-burns-drift-diag': {
          '0%': { transform: 'scale(1.04) translate(-1%, -1%)' },
          '33%': { transform: 'scale(1.08) translate(0.5%, -0.5%)' },
          '66%': { transform: 'scale(1.06) translate(-0.5%, 0.8%)' },
          '100%': { transform: 'scale(1.04) translate(-1%, -1%)' },
        },
        'ticker-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.333%)' },
        },
        'breathing-glow': {
          '0%, 100%': { boxShadow: '0 0 8px 0 currentColor' },
          '50%': { boxShadow: '0 0 20px 4px currentColor' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'ken-burns': 'ken-burns 12s ease-in-out infinite',
        'ken-burns-subtle': 'ken-burns-subtle 14s ease-in-out infinite',
        'ken-burns-drift-right': 'ken-burns-drift-right 18s ease-in-out infinite',
        'ken-burns-drift-left': 'ken-burns-drift-left 20s ease-in-out infinite',
        'ken-burns-drift-down': 'ken-burns-drift-down 16s ease-in-out infinite',
        'ken-burns-drift-diag': 'ken-burns-drift-diag 22s ease-in-out infinite',
        'ticker-scroll': 'ticker-scroll 25s linear infinite',
        'breathing-glow': 'breathing-glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
