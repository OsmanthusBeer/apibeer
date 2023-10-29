import typography from '@tailwindcss/typography'
import daisyuiPlugin from 'daisyui'
import type { Config } from 'tailwindcss'

export default <Partial<Config>> {
  plugins: [typography, daisyuiPlugin],
  // https://daisyui.com/docs
  daisyui: {
    themes: [
      // daisyUI themes: https://daisyui.com/docs/themes/
      // 'winter',
      // 'retro',
      'cupcake',
      'dark',
    ],
  },
}
