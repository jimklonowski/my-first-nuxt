// import { en, fr, en as ca } from 'vuetify/lib/locale'
import { en, fr, en as enCA } from 'vuetify/lib/locale'
import colors from 'vuetify/es5/util/colors'
import imageminMozjpeg from 'imagemin-mozjpeg'

export default {
  /**
   * Override vue config
   */
  vue: {
    config: {
      productionTip: false,
      devtools: process.env.NODE_ENV === 'development'
    }
  },
  mode: 'universal',
  router: {
    base: process.env.NODE_ENV === 'production' ? '/nuxt/' : '/'
  },
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: 'EMKAY :: %s',
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Since 1946, EMKAY has been the premier vehicle fleet management company in North America. We are your solution for your company car needs. Contact EMKAY 630-250-7400.' },
      { hid: 'keywords', name: 'keywords', content: 'Emkay, leasing, fleet, fleet leasing, managed vehicles, corporate leasing, emkay, emkaynet, lease' },

      // Open Graph
      { hid: 'og:url', property: 'og:url', content: 'https://emkay.com' },
      { hid: 'og:title', property: 'og:title', content: 'EMKAY' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'EMKAY' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {
    // color: colors.deepPurple
    color: colors.amber.base,
    failedColor: colors.deepOrange.accent4,
    height: '4px'
  },
  /*
  ** Global CSS
  */
  css: [
    './assets/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/custom-filters',
    '~/plugins/vue-mock-axios',
    { src: '~/plugins/vue-json-excel', ssr: false },
    { src: '~/plugins/vue-snotify', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/vuetify-module
    '@nuxtjs/vuetify',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://github.com/nuxt-community/moment-module
    '@nuxtjs/moment'
  ],
  moment: {
    locales: ['fr-ca', 'en-ca']
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    // '@nuxtjs/toast',
    'nuxt-i18n',
    // Doc: https://github.com/nuxt-community/style-resources-module
    // '@nuxtjs/style-resources',
    ['nuxt-imagemin', {
      plugins: [
        imageminMozjpeg({
          quality: 65,
          progressive: true
        })
      ]
    }]
  ],
  // styleResources: {
  //   scss: ['~/assets/main.scss']
  // },
  i18n: {
    locales: [
      {
        name: 'English',
        code: 'en',
        iso: 'en-US',
        file: 'en-us.js'
      },
      {
        name: 'English (Metric)',
        code: 'en-ca',
        iso: 'en-CA',
        file: 'en-ca.js'
      },
      {
        name: 'Français',
        code: 'fr-ca',
        iso: 'fr-CA',
        file: 'fr-ca.js'
      }
    ],
    // defaultLocale: 'en',
    defaultLocale: 'en',
    strategy: 'prefix_and_default',
    detectBrowserLanguage: false,
    noPrefixDefaultLocale: false,
    redirectCookieKey: true,
    useRedirectCookie: true,
    lazy: true,
    langDir: 'lang/',
    vueI18n: {
      fallbackLocale: 'en',
      silentFallbackWarn: true
    }
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'http://localhost:3000/api'
  },
  /*
  ** Auth module configuration
  **
  */
  auth: {
    plugins: [
      {
        // In production, we shouldn't be using mock-axios...
        src: '~/plugins/vue-mock-axios'
      }
    ],
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/'
    },
    strategies: {
      local: {
        _scheme: 'refresh',
        token: {
          property: 'access_token'
        },
        refreshToken: {
          property: 'refresh_token'
        },
        user: 'user',
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          refresh: { url: '/auth/refresh', method: 'post' },
          user: { url: '/auth/user', method: 'get' },
          logout: { url: '/auth/logout', method: 'post' }
          // logout: { url: '/auth/logout', method: 'post' },
          // user: { url: '/auth/user', method: 'get', propertyName: 'user' }
        }
      }
    }
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    lang: {
      locales: { en, fr, enCA },
      current: 'en'
    },
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        light: {
          primary: colors.deepPurple,
          accent: colors.amber.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten2
          // warning: colors.amber.base,
          // accent: '#005CAF',
        },
        dark: {
          primary: colors.deepPurple.lighten2,
          secondary: colors.grey.darken3,
          accent: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // config.resolve.alias.vue = 'vue/dist/vue.common'
    }
  }
}
