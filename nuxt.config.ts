// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/google-fonts'],
  css: ['~/assets/css/main.css'],
  googleFonts: {
    families: {
      'Josefin+Sans': true,
    },
  },
  ui: {
    icons: ['heroicons', 'mdi'],
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
});
