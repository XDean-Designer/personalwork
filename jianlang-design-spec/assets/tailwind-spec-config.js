/** 剑琅联盟设计规范站 · Tailwind CDN theme（阶段 1）· 阶段 2 迁入 tailwind.config.js */
tailwind.config = {
  corePlugins: { preflight: false },
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
      },
      borderRadius: {
        card: '12px',
        pill: '9999px',
      },
      spacing: {
        'card-head': '168px',
      },
    },
  },
};
