/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Design System Colors - Atelier Spirits & Brew
      colors: {
        'surface-obsidian': '#0F1115',
        'surface-slate': '#17191F',
        'surface-container': '#1d1f26',
        'surface-container-high': '#282a30',
        'surface-container-highest': '#33353b',
        'surface-container-low': '#191b21',
        'surface-container-lowest': '#0c0e14',
        'surface-smoke': '#2A2E37',
        'surface-variant': '#33353b',
        'surface-bright': '#373940',
        'surface-dim': '#111319',
        'surface': '#111319',
        'surface-hover': '#22252d',
        
        'bar-mode-text': '#FFFFFF',
        'bar-mode-surface': '#12141A',
        'bar-mode-canvas': '#050608',
        
        'cream-text': '#F8F5EE',
        'cream-muted': '#C5C0B3',
        
        'primary': '#ffbb60',
        'primary-container': '#e59e38',
        'primary-fixed': '#ffddb6',
        'primary-fixed-dim': '#ffb95b',
        'on-primary': '#462a00',
        'on-primary-fixed': '#2a1800',
        'on-primary-fixed-variant': '#643f00',
        'on-primary-container': '#5c3900',
        
        'tertiary': '#ffbc4b',
        'tertiary-container': '#e0a131',
        'tertiary-fixed': '#ffddaf',
        'tertiary-fixed-dim': '#fdba49',
        'on-tertiary': '#432c00',
        'on-tertiary-fixed': '#281800',
        'on-tertiary-fixed-variant': '#614000',
        'on-tertiary-container': '#593b00',
        
        'secondary': '#ffb68c',
        'secondary-container': '#964400',
        'secondary-fixed': '#ffdbc9',
        'secondary-fixed-dim': '#ffb68c',
        'on-secondary': '#532200',
        'on-secondary-fixed': '#321200',
        'on-secondary-fixed-variant': '#753400',
        'on-secondary-container': '#ffcaac',
        
        'copper-accent': '#D97736',
        'amber-vibrant': '#F5B342',
        'amber-glow': 'rgba(229, 158, 56, 0.18)',
        
        'error': '#ffb4ab',
        'error-container': '#93000a',
        'on-error': '#690005',
        'on-error-container': '#ffdad6',
        
        'outline': '#9f8e7c',
        'outline-variant': '#514536',
        'border-smoky': 'rgba(248, 245, 238, 0.08)',
        'border-focus': 'rgba(245, 179, 66, 0.45)',
        
        'inverse-primary': '#845400',
        'inverse-surface': '#e2e2ea',
        'inverse-on-surface': '#2e3037',
        'on-surface': '#e2e2ea',
        'on-background': '#e2e2ea',
        'on-surface-variant': '#d6c3b0',
        'surface-tint': '#ffb95b',
      },

      // Font Families
      fontFamily: {
        'headline-display': ['Newsreader', 'serif'],
        'headline-lg': ['Newsreader', 'serif'],
        'headline-md': ['Newsreader', 'serif'],
        'headline-display-mobile': ['Newsreader', 'serif'],
        'headline-lg-mobile': ['Newsreader', 'serif'],
        'bar-mode-step': ['Plus Jakarta Sans', 'sans-serif'],
        'bar-mode-step-mobile': ['Plus Jakarta Sans', 'sans-serif'],
        'bar-mode-metric': ['Plus Jakarta Sans', 'sans-serif'],
        'bar-mode-metric-mobile': ['Plus Jakarta Sans', 'sans-serif'],
        'body-lg': ['Plus Jakarta Sans', 'sans-serif'],
        'body-md': ['Plus Jakarta Sans', 'sans-serif'],
        'body-sm': ['Plus Jakarta Sans', 'sans-serif'],
        'label-md': ['Plus Jakarta Sans', 'sans-serif'],
        'label-sm': ['Plus Jakarta Sans', 'sans-serif'],
        'sans': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },

      // Font Sizes
      fontSize: {
        'bar-mode-step-mobile': ['22px', { lineHeight: '30px', fontWeight: '700' }],
        'headline-lg-mobile': ['28px', { lineHeight: '36px', fontWeight: '500' }],
        'label-md': ['14px', { lineHeight: '18px', letterSpacing: '0.04em', fontWeight: '600' }],
        'headline-md': ['24px', { lineHeight: '32px', fontWeight: '500' }],
        'bar-mode-step': ['32px', { lineHeight: '40px', fontWeight: '700' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'headline-display': ['56px', { lineHeight: '64px', letterSpacing: '-0.02em', fontWeight: '400' }],
        'headline-display-mobile': ['36px', { lineHeight: '44px', letterSpacing: '-0.01em', fontWeight: '400' }],
        'bar-mode-metric': ['48px', { lineHeight: '52px', letterSpacing: '-0.01em', fontWeight: '800' }],
        'body-sm': ['13px', { lineHeight: '20px', fontWeight: '400' }],
        'label-sm': ['11px', { lineHeight: '14px', letterSpacing: '0.08em', fontWeight: '700' }],
        'body-md': ['15px', { lineHeight: '24px', fontWeight: '400' }],
        'headline-lg': ['36px', { lineHeight: '44px', fontWeight: '500' }],
        'bar-mode-metric-mobile': ['32px', { lineHeight: '36px', fontWeight: '800' }],
      },

      // Spacing System
      spacing: {
        'space-xs': '0.25rem',
        'space-sm': '0.5rem',
        'space-md': '1rem',
        'space-lg': '1.5rem',
        'space-xl': '2.5rem',
        'space-2xl': '4rem',
        'margin': '3rem',
        'margin-mobile': '1.25rem',
        'gutter': '1.5rem',
        'gutter-mobile': '1rem',
      },

      // Border Radius
      borderRadius: {
        'DEFAULT': '0.25rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        'full': '9999px',
      },

      // Backdrop Blur
      backdropBlur: {
        'xs': '2px',
      },

      // Box Shadows
      boxShadow: {
        'glow': '0 0 28px rgba(245, 179, 66, 0.35)',
        'glow-sm': '0 0 16px rgba(245, 179, 66, 0.6)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'inner-glow': 'inset 0 0 20px rgba(245, 179, 66, 0.1)',
      },
    },
  },
  plugins: [],
}
