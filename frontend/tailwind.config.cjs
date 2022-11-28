/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    backgroundSize: {
      100: "100%",
    },
    boxShadow: {
      editProfile: "0 2px 4px rgba(0, 0, 0, .16)",
      dropdown: "0 2px 5px 0 rgba(0, 0, 0,.26),0 2px 10px 0 rgba(0, 0, 0,.16)",
    },
    extend: {
      animation: {
        "bounce-in": "bounce-in 0.75s cubic-bezier(.1,.82,.25,1)",
        "slide-down": "slide-down 1s cubic-bezier(.1,.82,.25,1)",
      },
      keyframes: {
        "bounce-in": {
          "0%, 20%": { transform: "scale(0)" },
          "100%": { transform: "none" },
        },
        "slide-down": {
          "0%, 30%": { transform: "translateY(-50px)", opacity: 0 },
          "100%": { transform: "none", opacity: 1 },
        },
      },
      transitionTimingFunction: {
        default: "cubic-bezier(.1,.82,.25,1)",
      },
      transitionProperty: {
        "background-color": "background-color",
      },
      spacing: {
        0.75: "0.1875rem",
        1.75: "0.44rem",
        2.25: "0.56rem",
        18: "4.5rem",
        22: "5.5rem",
        50: "12.5rem",
        100: "26rem",
        120.2: "31.25rem",
        "100vh": "100vh",
      },
      backgroundImage: (theme) => ({
        "react-logo": "url('https://reactjs.org/logo-og.png')",
      }),
      borderRadius: {
        message: "0.47rem",
      },
    },
    colors: {
      modal: {
        backdrop: "rgba(9,14,17,0.85)",
        header: "#323739",
      },
      dropdown: {
        dark: "#2a2f32",
        hover: "#20272b",
      },
      newChat: {
        light: "#323739",
      },
      editProfile: {
        "photopicker-overlay": "rgba(35,43,47,0.8)",
        teal: "#009688",
      },
      message: {
        sent: "#056162",
        received: "#262d31",
        content: "rgba(241, 241, 242, 0.95)",
      },
      header: {
        dark: "#2a2f32",
        light: "#b1b3b5",
        active: "rgba(0, 0, 0, 0.1)",
      },
      search: {
        dark: "#131c21",
        medium: "#323739",
        placeholder: "#f1f1f2",
        light: "#828689",
      },
      contact: {
        dark: "#131c21",
        active: "rgb(50, 55, 57)",
        hover: "rgb(45, 49, 52)",
      },
      actions: {
        dark: "#1e2428",
        light: "#33383b",
        icons: "rgb(130, 134, 137)",
        message: "rgb(241, 241, 242)",
      },
      divider: "#242d32",
      default: "rgba(241, 241, 242, 0.92)",
      defaultDark: "rgba(241, 241, 242, 0.8)",
      idle: "#262d31",
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [],
};
