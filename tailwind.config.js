module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#FBC02D',
          surface: '#FFF6E5',
          border: '#f9d782'
        },
        dark: '#141414',
        background: '#F5F5F5',
        danger: {
          main: '#FF3D3D',
          surface: '#FFEFED',
          border: '#FF9494',
          hover: '#DD2A2A',
          pressed: '#BB1A1A',
          focused: '#FF3D3D33',
        },
        warning: {
          main: '#FFAB00',
          surface: '#FFF6E5',
          border: '#FFD88A',
          hover: '#D69000',
          pressed: '#AD7400',
          focused: '#FFAB00',
        },
        success: {
          main: "#36B37E",
          surface: "#DDFFF1",
          border: "#8AFFCD",
          hover: "#249163",
          pressed: '#156F49',
          focus: '#36B37E33'
        },
        info: {
          main: "#0065FF",
          surface: "#E5EFFF",
          border: "#8AB8FF",
          hover: "#0055D6",
          pressed: '#003585',
          focus: '#0065FF33'
        },
      },
      borderRadius: {
        none: '0',
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '1rem',
        '2xl': '1.125rem',
        '3xl': '1.375rem',
        '4xl': '1.75rem',
        full: '9999px',
        large: '12px',
      },
      fontFamily: {
        'headings': 'Rajdhani',
        'paragraphs': 'Arial'
      },
      fontSize: {
        '3xs': '0.5rem',
        '2xs': '0.625rem',
        xs: '0.75rem',
        sm: '0.875rem',
        base: '16px',
        md: '1.125rem',
        lg: '1.25rem',
        xl: '1.375rem',
        '2xl': '1.5rem',
        '3xl': '1.75rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
        '7xl': '4rem',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding'
      },
      keyframes: {
        swell: {
          '0%, 100%': { transform: 'scale(1.1)' },
          '50%': { transform: 'scale(1)' },
        }
      },
      animation: {
        swell: 'swell 3.5s ease-in-out infinite',
      }

    },
  },
  variants: {
    extend: {
      textColor: ['active'],
      textColor: ['disabled']
    },
    transitionProperty: ['responsive', 'motion-safe', 'motion-reduce']
  },
  plugins: [],
}
