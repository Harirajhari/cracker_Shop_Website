/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E8450A',
          light: '#FF6B35',
          dark: '#B33308',
          pale: '#FEF0EA',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E2C46A',
          dark: '#A07C2A',
          pale: '#FBF5E6',
        },
        ink: {
          DEFAULT: '#1A1A1A',
          light: '#3D3D3D',
          muted: '#6B6B6B',
          faint: '#9A9A9A',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          soft: '#FAFAFA',
          warm: '#FFF8F5',
          gold: '#FFFBF0',
        },
      },
      fontFamily: {
        display: ['"Cinzel"', 'serif'],
        heading: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #E2C46A 50%, #A07C2A 100%)',
        'primary-gradient': 'linear-gradient(135deg, #E8450A 0%, #F5A623 100%)',
        'warm-gradient': 'linear-gradient(135deg, #FFF8F5 0%, #FEF0EA 100%)',
      },
      boxShadow: {
        'primary': '0 4px 24px rgba(232, 69, 10, 0.18)',
        'gold': '0 4px 24px rgba(201, 168, 76, 0.18)',
        'card': '0 2px 16px rgba(26, 26, 26, 0.08)',
        'card-hover': '0 8px 32px rgba(26, 26, 26, 0.14)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'spark': 'spark 1.5s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        spark: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(2.5)' },
        },
      },
    },
  },
  plugins: [],
}
