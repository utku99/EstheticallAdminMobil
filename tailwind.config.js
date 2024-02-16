/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customOrange: "#FF8170",
        customGray: "#4D4A48",
        customLightGray: "#CECECE",
        customBrown: "#8F7A6C",
        background: "#FAFAFA"
      },
      fontFamily: {
        poppinsBold: ["Poppins-Bold"],
        poppinsSemiBold: ["Poppins-SemiBold"],
        poppinsBlack: ["Poppins-Black"],
        poppinsItalic: ["Poppins-Italic"],
        poppinsRegular: ["Poppins-Regular"],
        poppinsMedium: ["Poppins-Medium"],
      },
      fontSize: {
        xxs: ["10px", "15px"]
      }
    },
  },
  plugins: [],
}

