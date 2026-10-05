import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { VApp, VMain, VBtn, VIcon, VContainer, VRow, VCol, VCard, VCardText, VDivider } from 'vuetify/components'

import { createVuetify } from 'vuetify'

const vuetify = createVuetify({
  components: {
    VApp,
    VMain,
    VBtn,
    VIcon,
    VContainer,
    VRow,
    VCol,
    VCard,
    VCardText,
    VDivider,
  },

  theme: {
    defaultTheme: 'paroquia',

    themes: {
      paroquia: {
        dark: false,
        colors: {
          background: '#FAF8F4',
          surface: '#FFFFFF',
          primary: '#1B2A4A',
          'on-primary': '#FFFFFF',
          secondary: '#C9A84C',
          'on-secondary': '#1B2A4A',
          accent: '#3D5A80',
          info: '#3D5A80',
        },
      },
    },
  },
})

export default vuetify
