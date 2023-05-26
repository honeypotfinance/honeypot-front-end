import webpack from 'webpack'
import colors from 'vuetify/es5/util/colors'

const development = process.env.NODE_ENV !== 'production'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Honeypot Dex',
    title: 'Home',
    htmlAttrs: {
      lang: 'en',
      class: 'dark',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      // <-- icons-default -->
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
      // <!-- fonts -->
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      //   <!-- DM Sans -->
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap' },
      //   <!-- Inter -->
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap' },
      //   <!-- poppins -->
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap' }
    ],
    script: [
      // {
      //   src: "https://code.jquery.com/jquery-3.5.1.min.js",
      //   body: true
      // },
    ],
  },

  loading: {
    color: 'hsl(225 225% 225% / .5)',
    height: '2px',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/styles/main/main.scss"],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  // components: true,
  components: [
    '~/components', // shortcut to { path: '~/components' }
    // { path: '~/components/sections/', prefix: 'sections' },
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // plugins
    '~/plugins/injects.js',
    '~/plugins/polyfills.js',
    '~/plugins/directives.js',
    '~/plugins/axios.js',
    '~/plugins/apexchart.js',
    '~/plugins/google-maps.js',
    '~/plugins/vue-debounce.js',
    // services
    // '~/services/near-api',
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
  ],

  // we3-nuxt: https://www.npmjs.com/package/nuxt-web3
  publicRuntimeConfig: {
    web3: {
      provider: process.env.WEB3_PROVIDER_URL
    }
  },

  privateRuntimeConfig: {
    web3: {
      provider: process.env.PROVIDER_URL
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: development ? 'http://localhost:3001/api' : 'https://domain/api',
  },

  // nuxt i18n documentation: https://i18n.nuxtjs.org
  /*
    1- function to switch language: switchLocalePath('en')
    2- function to push prefix routes: localePath('/')
    3- i18n data object: $i18n.locale  --> locale language
  */
  i18n: {
    locales: [
      { code: "es", iso: "es", file: "es.js" },
      { code: "en", iso: "en", file: "en.js" }
    ],
    lazy: true,
    langDir: "i18n/",
    defaultLocale: "en",
    vueI18nLoader: true,
    detectBrowserLanguage: false,
    strategy: "prefix_except_default",
    vueI18n: {
      fallbackLocale: "en",
      fallbackRoot: true,
      silentFallbackWarn: false,
      silentTranslationWarn: false,
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/styles/main/_variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Router property -  https://nuxtjs.org/docs/2.x/features/file-system-routing#the-router-property
  router: {
    base: development ? '/honeypot-dex/' : '/',
    // middleware: ['route-validator'],
  },

  server: {
    host: 'localhost', // default: localhost,
    port: '8000', // default: 3000
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    publicPath: development ? '/honeypot-dex/' : '/',
    plugins: [
      new webpack.ProvidePlugin({
        // global modules
        configureWebpack:{
          performance: {
            hints: false
          },
          optimization: {
            splitChunks: {
              minSize: 10000,
              maxSize: 500000,
            }
          }
        },
      }),
    ],
    extend(config, ctx) {
      config.module.rules.push({
        exclude: /(node_modules)/,
      })
    },
  },
}
