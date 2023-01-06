const express = require('express')
const consola = require('consola')
const https = require('https')
const fs = require('fs')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const compression = require('compression');

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
    // Init Nuxt.js
    const nuxt = new Nuxt(config)

    const { host, port } = nuxt.options.server

    // Build only in dev mode
    if (config.dev) {
        const builder = new Builder(nuxt)
        await builder.build()
    } else {
        await nuxt.ready()
    }

    // Give nuxt middleware to express
    app.use(nuxt.render)
    app.use(compression())

    // Listen the server
    if (process.env.NODE_ENV == 'development' && process.env.PROTOCOL == 'https') {
        https.createServer({
                key: fs.readFileSync(process.env.CERT_KEY_PATH),
                cert: fs.readFileSync(process.env.CERT_PATH)
            }, app)
            .listen(port, host)
        consola.ready({
            message: `Server listening on https://${host}:${port}`,
            badge: true
        })
    } else {
        app.listen(port, host)
        consola.ready({
            message: `Server listening on http://${host}:${port}`,
            badge: true
        })
    }
}
start()