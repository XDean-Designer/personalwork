/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,html}'],
  theme: {
    extend: {
      colors: {
        brand: {
          1: '#FEF0F1',
          6: '#F32F41',
          7: '#D92939',
        },
        figma: {
          primary: '#333333',
          secondary: '#929292',
        },
        mc: {
          label: '#666666',
          body: '#8E8E8E',
          del: '#666666',
        },
        border: { DEFAULT: '#D7D7D5' },
      },
      fontFamily: {
        ui: ['PingFang SC', '-apple-system', 'Helvetica Neue', 'sans-serif'],
        data: ['TCloudNumber', 'PingFang SC', 'sans-serif'],
      },
      maxWidth: {
        card: '358px',
        btn: '370px',
        canvas: '390px',
      },
      borderRadius: {
        card: '12px',
        pill: '9999px',
      },
      spacing: {
        'card-head': '168px',
        'nav-h': '44px',
        'status-bar-h': '53px',
        'bottom-placeholder': '34px',
        'tabbar-h': '56px',
        'page-title-bar-side': '72px',
      },
      height: {
        'nav-h': '44px',
        'status-bar-h': '53px',
        'bottom-placeholder': '34px',
        'tabbar-h': '56px',
      },
    },
  },
  plugins: [],
};
