import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

:root {

  &, &.light-mode {

    /* Neutral */
    --color-grey-0: #ffffff;
    --color-grey-50: #faf7ff;
    --color-grey-100: #f3ecff;
    --color-grey-200: #e5d8ff;
    --color-grey-300: #d3c2ff;
    --color-grey-400: #b49bff;
    --color-grey-500: #8e6df5;
    --color-grey-600: #6c49d9;  
    --color-grey-700: #4a2fb2;
    --color-grey-800: #2c1978;
    --color-grey-900: #1c104d;

    /* Brand / Accent */
    --color-brand-50: #f5e8ff;
    --color-brand-100: #e5c8ff;
    --color-brand-200: #cfa2ff;
    --color-brand-300: #b47aff;
    --color-brand-400: #9a52ff;
    --color-brand-500: #9333EA;  /* Main Purple */
    --color-brand-600: #7e22ce;
    --color-brand-700: #6b21a8;
    --color-brand-800: #581c87;
    --color-brand-900: #3b0764;

    --color-accent: #EC4899; /* Pink Boost */

    /* UI */
    --backdrop-color: rgba(255, 255, 255, 0.15);
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.06);
    --shadow-md: 0px 10px 25px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 30px 40px rgba(0, 0, 0, 0.1);

    --image-grayscale: 0%;
    --image-opacity: 100%;
  }

  /* DARK MODE */
  &.dark-mode {
    --color-grey-0: #12071F;
    --color-grey-50: #1C0E2B;
    --color-grey-100: #251138;
    --color-grey-200: #3a1b54;
    --color-grey-300: #513076;
    --color-grey-400: #6b4c9b;
    --color-grey-500: #a785ff;
    --color-grey-600: #c7b4ff;
    --color-grey-700: #e5d8ff;
    --color-grey-800: #f6efff;
    --color-grey-900: #ffffff;

    --color-brand-500: #C084FC;
    --color-accent: #F472B6;

    --backdrop-color: rgba(0, 0, 0, 0.35);
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
    --shadow-md: 0px 10px 25px rgba(0, 0, 0, 0.35);
    --shadow-lg: 0 30px 40px rgba(0, 0, 0, 0.4);

    --image-grayscale: 15%;
    --image-opacity: 90%;
  }

  /* Radii */
  --border-radius-tiny: 4px;
  --border-radius-sm: 6px;
  --border-radius-md: 10px;
  --border-radius-lg: 18px;
}

/* ---------- Base Reset ---------- */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  transition: background-color .3s, border .3s, color .3s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Poppins", sans-serif;
  background: linear-gradient(120deg, var(--color-brand-500), var(--color-accent));
  color: var(--color-grey-800);
  min-height: 100vh;
  font-size: 1.6rem;
  line-height: 1.6;
}

/* UI Elements */
input, button, textarea, select {
  font: inherit;
  color: inherit;
}

button { cursor: pointer; }

*:disabled { cursor: not-allowed; opacity: .6; }

input:focus, textarea:focus, select:focus {
  outline: 3px solid var(--color-brand-500);
  outline-offset: 2px;
}

/* Links */
a { text-decoration: none; color: inherit; }

/* Typography */
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

/* Images */
img {
  max-width: 100%;
  border-radius: var(--border-radius-md);
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

`;

export default GlobalStyles;
