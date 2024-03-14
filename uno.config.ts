// uno.config.ts
import { defineConfig, presetTypography } from 'unocss'
import presetAttributify from '@unocss/preset-attributify'
import presetIcons from '@unocss/preset-icons'
import presetUno from '@unocss/preset-uno'
import presetRemToPx from '@unocss/preset-rem-to-px'
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2, warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    // presetTypography(),
    // presetRemToPx({
    //   // 官方的默认预设 1单位 = 0.25rem, html的字体是16,所以这里为4
    //   baseFontSize: 4,
    // })
  ],
  shortcuts: [
    { logo: 'i-logos-react w-6em h-6em transform transition-800 hover:rotate-180' },

    ['wh-full', 'w-full h-full'],
    ['f-c-c', 'flex justify-center items-center'],
    ['flex-col', 'flex flex-col'],
    ['text-ellipsis', 'truncate'],
    ['icon-btn', 'text-16px inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 !outline-none'],
    ['card-border', 'border border-solid border-light_border dark:border-dark_border'],

  ],
  rules: [
    [/^bc-(.+)$/, ([, color]) => ({ 'border-color': `#${color}` })],
    ['card-shadow', { 'box-shadow': '0 1px 2px -2px #00000029, 0 3px 6px #0000001f, 0 5px 12px 4px #00000017' }],
  ],
  theme: {
    colors: {
      primary: '#316c72',
      dark_bg: '#18181c',
      dark: '#18181c',
      light_border: '#efeff5',
      dark_border: '#2d2d30',
    },
  },
})
