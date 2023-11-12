import typography from '@tailwindcss/typography'
import daisyui from 'daisyui'
import type { Config } from 'tailwindcss'

export default <Partial<Config>> {
  plugins: [typography, daisyui],
  // https://daisyui.com/docs
  daisyui: {
    themes: [
      'light',
      'dark',
    ],
    logs: false,
  },
}
