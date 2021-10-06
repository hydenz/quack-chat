module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        1.75: '0.44rem',
        2.25: '0.56rem',
        18: '4.5rem',
        22: '5.5rem',
        100: '26rem',
      },
      backgroundImage: (theme) => ({
        'react-logo': "url('https://reactjs.org/logo-og.png')",
      }),
      borderRadius: {
        message: '0.47rem',
      },
    },
    colors: {
      newChat: {
        light: '#323739',
      },
      message: {
        sent: '#056162',
        received: '#262d31',
        content: 'rgba(241, 241, 242, 0.95)',
      },
      header: {
        dark: '#2a2f32',
        light: '#b1b3b5',
        active: 'rgba(0, 0, 0, 0.1)',
      },
      search: {
        dark: '#131c21',
        medium: '#323739',
        placeholder: '#f1f1f2',
        light: '#828689',
      },
      contact: {
        dark: '#131c21',
        active: 'rgb(50, 55, 57)',
        hover: 'rgb(45, 49, 52)',
      },
      actions: {
        dark: '#1e2428',
        light: '#33383b',
        icons: 'rgb(130, 134, 137)',
        message: 'rgb(241, 241, 242)',
      },
      divider: '#242d32',
      default: 'rgba(241, 241, 242, 0.92)',
      defaultDark: 'rgba(241, 241, 242, 0.8)',
      idle: '#262d31',
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
};
