// unocss config: https://unocss.dev/config/
// interactive: https://unocss.dev/interactive
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  shortcuts: [
    // shortcuts to multiple utilities
    {
      btn: 'py-2 px-4 font-semibold rounded-lg shadow-md cursor-pointer border-none',
    },
    // dynamic shortcuts
    [/^btn-(.*)$/, ([, c]) => `btn bg-${c}-400 text-${c}-100`]
  ],
  theme: {
    colors: {
      // ...
    }
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      collections: {
        // https://tabler-icons.io/
        'tabler-icons': () => import('@iconify-json/tabler/icons.json').then(i => i.default),
      }
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})