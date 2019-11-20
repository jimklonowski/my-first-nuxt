import { en, fr, en as ca } from 'vuetify/lib/locale'
import colors from 'vuetify/es5/util/colors'
import imageminMozjpeg from 'imagemin-mozjpeg'

export default {
  mode: 'universal',
  router: {
    base: process.env.NODE_ENV === 'production' ? '/nuxt/' : '/'
  },
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: 'EMKAY :: nuxtjs',
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: colors.deepPurple
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/mock-axios',
    { src: '~/plugins/vue-grid', ssr: false }
    // { src: '~/plugins/vue-masonry', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'nuxt-i18n',
    ['nuxt-imagemin', {
      plugins: [
        imageminMozjpeg({
          quality: 65,
          progressive: true
        })
      ]
    }]
  ],
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
        code: 'ca',
        iso: 'en-CA',
        file: 'en-ca.js'
      },
      {
        name: 'Français',
        code: 'fr',
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
        src: '~/plugins/mock-axios'
      }
    ],
    redirect: {
      login: '/login',
      logout: '/login',
      home: false
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
      locales: { en, fr, ca },
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
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
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

    }
  }
}
