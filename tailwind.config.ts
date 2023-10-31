import typography from '@tailwindcss/typography'
import daisyuiPlugin from 'daisyui'
import type { Config } from 'tailwindcss'

export default <Partial<Config>> {
  plugins: [typography, daisyuiPlugin],
  // https://daisyui.com/docs
  daisyui: {
    themes: [
      'light',
      'dark',
    ],
  },
}
