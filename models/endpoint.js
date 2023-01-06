const endpoint = () => ({
    menu: 'menu',
    frontPages: 'front-pages',
    kurban_report_hashed: 'kurban-report',
    kurban_report: 'kurban-report/search',
    pages: 'pages',
    images: 'images',
    highlight_transaction: 'highlight-transaction',
    forgot_password: 'forgot-password',
    reset_password: 'reset-password',
    projects: 'crowdfunding',
    project_categories: 'crowdfunding-category',
    transaction_categories: 'transaction-category',
    news: 'post',
    news_categories: 'post-category',
    register: 'register',
    transaction: {
        detail: 'transaction',
        crowdfunding: 'transaction/penghimpunan',
        history: 'transaction',
        confirmation: 'payment-confirmation',
        qurban: 'transaction/kurban'
    },
    accountNumber: 'payment-account',
    socialAuth: 'auth-social',
    notification: {
        list: 'notifications',
        count: 'notification-unread'
    },
    user: {
        myProfile: 'me',
    },
    qurban: 'kurban-product'
})

export default ({
    app,
    $axios
}, inject) => {
    inject('endpoint', endpoint())

    let endpoints = endpoint()

    for (let endpoint in endpoints) {
        if (typeof endpoints[endpoint] == 'object') {
            for (let subEndpoint in endpoints[endpoint]) {
                let url = endpoints[endpoint][subEndpoint]

                endpoints[endpoint][subEndpoint] = app.$apiModel(
                    $axios, url
                )
            }
        } else {
            let url = endpoints[endpoint]
            endpoints[endpoint] = app.$apiModel(
                $axios, url
            )
        }

        inject(endpoint, endpoints[endpoint])
    }
}