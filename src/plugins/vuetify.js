import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import {
  VApp,
  VAppBar,
  VMain,
  VBtn,
  VIcon,
  VContainer,
  VRow,
  VCol,
  VCard,
  VCardText,
  VCardTitle,
  VCardActions,
  VDivider,
  VTextField,
  VTextarea,
  VCheckbox,
  VSnackbar,
  VNavigationDrawer,
  VList,
  VListItem,
  VSpacer,
  VChip,
  VImg,
  VForm,
  VFadeTransition,
  VPagination,
} from 'vuetify/components'

import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const vuetify = createVuetify({
  components: {
    VApp,
    VAppBar,
    VMain,
    VBtn,
    VIcon,
    VContainer,
    VRow,
    VCol,
    VCard,
    VCardText,
    VCardTitle,
    VCardActions,
    VDivider,
    VTextField,
    VTextarea,
    VCheckbox,
    VSnackbar,
    VNavigationDrawer,
    VList,
    VListItem,
    VSpacer,
    VChip,
    VImg,
    VForm,
    VFadeTransition,
    VPagination,
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  defaults: {
    VBtn: {
      style: 'text-transform: none; letter-spacing: 0.01em;',
      rounded: 'pill',
    },
    VCard: {
      rounded: 'lg',
      elevation: 0,
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
      hideDetails: 'auto',
    },
    VTextarea: {
      variant: 'outlined',
      density: 'comfortable',
      hideDetails: 'auto',
    },
    VCheckbox: {
      density: 'comfortable',
      hideDetails: 'auto',
      color: 'maroon',
    },
  },
  theme: {
    defaultTheme: 'paroquia',
    themes: {
      paroquia: {
        dark: false,
        colors: {
          background: '#F9F7F2',
          surface: '#FFFFFF',
          primary: '#1B2A4A',
          'on-primary': '#FFFFFF',
          secondary: '#B08A55',
          'on-secondary': '#FFFFFF',
          maroon: '#7A2430',
          'on-maroon': '#FFFFFF',
          gold: '#B08A55',
          cream: '#F9F7F2',
          ink: '#1A1A1A',
          muted: '#5C6570',
          accent: '#7A2430',
          info: '#3D5A80',
          success: '#2E7D4F',
          error: '#B3261E',
        },
      },
    },
  },
})

export default vuetify
