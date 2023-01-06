const fs = require('fs');
const path = require('path');

const shrinkRay = require('shrink-ray-current')
require('events').EventEmitter.defaultMaxListeners = 50;
require('dotenv').config()

const snapJS = process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'staging' ?
    process.env.MIDTRANS_SNAP_SANDBOX :
    process.env.MIDTRANS_SNAP

const midtransKey = process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'staging' ?
    process.env.MIDTRANS_KEY_SANDBOX :
    process.env.MIDTRANS_KEY

module.exports = {
    // Target (https://go.nuxtjs.dev/config-target)
    target: 'static',

    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'NU CARE LAZISNU',
        // htmlAttrs: {
        //     lang: 'en'
        // },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                name: 'google-signin-scope',
                content: 'profile email'
            },
            {
                name: 'google-signin-client_id',
                content: process.env.GAPI_CLIENT_ID
            },
            { hid: 'description', name: 'description', content: '"NUcare.id adalah situs resmi Lembaga Amil Zakat, Infaq dan Shadaqah NU yang dikelola oleh Pengurus Pusat (Jakarta). Saran dan kritik: email@nucare.id”' }
        ],
        link: [
            { rel: 'shortcut icon', type: 'image/png', href: '/favicon.png' },
        ],
        script: [
            {
                src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js',
                integrity: "sha384-vk5WoKIaW/vJyUAd9n/wmopsmNhiy+L2Z+SBxGYnUkunIxVxAv/UtMOhba/xskxh",
                crossorigin: "anonymous",
                async: true,
                defer: true,
            },
            {
                src: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js",
                integrity: "sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM",
                crossorigin: "anonymous",
                async: true,
                defer: true,
            },
            {
                async: true,
                defer: true,
                src: 'https://kit.fontawesome.com/9d7e199fbf.js',
                crossorigin: 'anonymous'
            },
            {
                src: 'https://apis.google.com/js/platform.js',
                defer: true,
                async: true
            },
            {
                rel: 'preload',
                as: 'script',
                async: true,
                src: `https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_TAG_ID}`,
            },
            {
                rel: 'preload',
                as: 'script',
                type: 'text/javascript',
                async: true,
                src: 'google-tag.js'
            },
            // {
            //     type: 'text/javascript',
            //     src: snapJS,
            //     "data-client-key": midtransKey
            // },
            // {
            //     rel: 'preload',
            //     as: 'script',
            //     type: 'text/javascript',
            //     async: true,
            //     src: '/assets/js/midtrans.js'
            // },
        ]
    },

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        '@nuxtjs/style-resources', ['nuxt-lazy-load', {
            // These are the default values
            images: true,
            videos: true,
            audios: true,
            iframes: true,
            native: false,
            polyfill: true,
            directiveOnly: false,

            defaultImage: '/assets/images/bg-grey.jpeg',

        }],
        'nuxt-compress', 
        ['nuxt-facebook-pixel-module', {
            track: 'PageView',
            pixelId: process.env.PIXEL_ID,
            disabled: process.env.NODE_ENV == 'development' ? true : false
        }],
        ['@nuxtjs/google-analytics', {
            id: process.env.GOOGLE_ANALYTICS,
            disabled: process.env.NODE_ENV == 'development' ? true : false
        }],
        'vue-sweetalert2/nuxt',
        '@nuxtjs/pwa',
    ],

    'nuxt-compress': {
        gzip: {
            threshold: 8192,
        },
        brotli: {
            threshold: 8192,
        },
    },

    render: {
        compressor: shrinkRay({
            filter: (req, res) => {
                if (/^\/api/.test(req.originalUrl)) {
                    return false
                }
                return shrinkRay.filter(req, res)
            }
        })
    },

    css: [
        '~/assets/css/bootstrap.min.css',
        '~/assets/css/style.css',
        '~/assets/css/fonts.css',
        '~/assets/css/swiper-bundle.min.css',
    ],

    styleResources: {
        scss: [
            // '~/assets/scss/bootstrap-scss/bootstrap.scss',
            // '~/assets/scss/main.scss',
            // '~/assets/scss/style.scss'
        ]
    },

    // Plugins
    plugins: [{
            src: '~/plugins/slick.js',
            ssr: false
        },
        { src: '~/plugins/axios.js' },
        { src: '~/models/api.js' },
        { src: '~/models/endpoint.js' },
        {
            src: '~/plugins/sweetalert.js',
            ssr: false
        },
        {
            src: '~/plugins/fbInit.js',
            ssr: false
        },
        {
            src: '~/plugins/v-money.js',
            ssr: false
        },
        {
            src: '~/filters/currency.js',
            ssr: false
        },
        {
            src: '~/plugins/social-sharing.js',
            ssr: false
        },
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        '@nuxtjs/auth-next',
        '@nuxtjs/axios',
    ],

    /**
     * Auth Module
     */
    auth: {
        strategies: {
            local: {
                token: {
                    property: 'data.token',
                    global: true,
                },
                endpoints: {
                    login: { url: '/login', method: 'post' },
                    logout: false,
                    user: { url: '/me', method: 'get' }
                },
                user: {
                    property: 'data',
                    // autoFetch: true
                },
            },
            google: {
                client_id: process.env.GAPI_CLIENT_ID,
            }
        },
        redirect: {
            login: '/'
        }
    },

    axios: {
        // browserBaseURL: 'https://api.nuxtjs.dev'
        proxy: true
    },
    proxy: {
        '/statistic-unit': {
            target: process.env.API_URL,
        },
        '/transaction/hit-pixel-facebook': {
            target: process.env.API_URL,
        },
        '/transaction/check-status': {
            target: process.env.API_URL,
        },
        '/code-phone': {
            target: process.env.API_URL,
        },
        '/partners': {
            target: process.env.API_URL,
        },
        '/partner-stories': {
            target: process.env.API_URL,
        },
        '/package-price': {
            target: process.env.API_URL,
        },
        '/transaction-category': {
            target: process.env.API_URL,
        },
        '/crowdfunding-bundles': {
            target: process.env.API_URL,
        },
        '/kurban-report': {
            target: process.env.API_URL,
        },
        '/kurban-report/search': {
            target: process.env.API_URL,
        },
        '/front-pages': {
            target: process.env.API_URL,
        },
        '/menu': {
            target: process.env.API_URL,
        },
        '/pages': {
            target: process.env.API_URL,
        },
        '/images': {
            target: process.env.API_URL,
        },
        '/highlight-transaction': {
            target: process.env.API_URL,
        },
        '/forgot-password': {
            target: process.env.API_URL,
        },
        '/reset-password': {
            target: process.env.API_URL,
        },
        '/crowdfunding': {
            target: process.env.API_URL,
        },
        '/crowdfunding-category': {
            target: process.env.API_URL,
        },
        '/transaction-category/wakaf': {
            target: process.env.API_URL,
        },
        '/transaction-category/donasi': {
            target: process.env.API_URL,
        },
        '/commit/register': {
            target: process.env.API_URL,
        },
        '/post': {
            target: process.env.API_URL,
        },
        '/post-category': {
            target: process.env.API_URL,
        },
        '/register': {
            target: process.env.API_URL,
        },
        '/transaction': {
            target: process.env.API_URL,
        },
        '/payment-account': {
            target: process.env.API_URL,
        },
        '/auth-social': {
            target: process.env.API_URL,
        },
        '/notifications': {
            target: process.env.API_URL,
        },
        '/notifications-unread': {
            target: process.env.API_URL,
        },
        '/me': {
            target: process.env.API_URL,
        },
        '/kurban-product': {
            target: process.env.API_URL,
        },
        '/login': {
            target: process.env.API_URL,
        },
    },

    // PWA
    pwa: {
        icon: {
            fileName: 'favicon.png',
            size: [64, 120, 144, 152, 192, 384, 512]
        },
        meta: {
            title: "LAZIZ-NU",
            author: "Alviyan Badro K"
        },
        manifest: {
            name: 'Laziz-NU',
            lang: 'fa',
            short_name : 'NUCOST',
            description : 'loremipsum',
            start_url: "",
        },
        workbox:{
            enabled : true,
            config:{
                debug:false,
            },
            cacheOptions:{
                cacheId:"snipcartjs-nuxt-pwa-prod",
                directoryIndex:"/",
                revision:"TeY9NomNHuRl"
            },
            clientsClaim:true,
            skipWaiting:true,
            cleanupOutdatedCaches:true,
            offlineAnalytics:false,
            preCaching:[
                {
                    revision:"TeY9NomNHuRl",
                    url:"/?standalone=true"
                }
            ],
            runtimeCaching:[
                {
                    urlPattern:"https://fonts.googleapis.com/.*",
                    handler:"CacheFirst",
                    method:"GET",
                    strategyOptions:{
                        cacheableResponse:{
                            statuses:[0,200]
                        }
                    },
                    strategyPlugins:[]
                },
                {
                    urlPattern:"https://fonts.gstatic.com/.*",
                    handler:"CacheFirst",
                    method:"GET",
                    strategyOptions:{
                        cacheableResponse:{
                            "statuses":[0,200]
                        }
                    },
                    strategyPlugins:[]
                },
                {
                    urlPattern:"https://cdn.snipcart.com/.*",
                    method:"GET",
                    strategyOptions:{
                        cacheableResponse:{
                            statuses:[0,200]
                        }
                    },
                    handler:"NetworkFirst",
                    strategyPlugins:[]
                },
                {
                    urlPattern:"https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js",
                    handler:"CacheFirst",
                    method:"GET",
                    strategyOptions:{
                        cacheableResponse:{
                            statuses:[0,200]
                        }
                    },
                    strategyPlugins:[]
                },
                {
                    urlPattern:"/_nuxt/",
                    handler:"CacheFirst",
                    method:"GET",
                    strategyPlugins:[]
                },
                // {
                //     urlPattern:"/",
                //     handler:"NetworkFirst",
                //     method:"GET",
                //     strategyPlugins:[]
                // }
            ],
            offlinePage:null,
            pagesURLPattern:"/",
            offlineStrategy:"NetworkFirst"
        }
    },

    server: {
        port: process.env.PORT, // default: 3000
        host: process.env.HOST // default: localhost
        // port: 3000,
        // host: '192.168.0.2'
    },
}