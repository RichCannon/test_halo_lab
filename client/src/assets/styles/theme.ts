
// breakpoints
const xl = `(max-width: 1920px)`
const lg = `(max-width: 1280px)`
const md = `(max-width: 960px)`
const sm = `(max-width: 600px)`
const xs = `(max-width: 0px)`


// Тема для более гибкой настройки цветов, шрифтов, брейкпоинтов, теней и т.п.
export const theme = {
   colors: {
      primary: `#f2f2f2`,
      error: `#e43f3f`,
      ok: `#4BCFA0`,
      white: `#fff`,
      black: `#000`,
      ok2: `#4bcfa0`,
      white2: `#f2f2f2`
   },
   breakpoints: {
      xl,
      lg,
      md,
      sm,
      xs
   }
} as const
