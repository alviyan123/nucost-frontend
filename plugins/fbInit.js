export default ({
    app
}, inject) => {
    inject('fbinit', {
        initFbSdk(options) {
            return new Promise(resolve => {
                window.fbAsyncInit = function() {
                    const defaults = { cookie: true, xfbml: true }
                    options = {...defaults, ...options }
                    window.FB.init(options)
                    resolve()
                };
                /* eslint-disable */
                (function(d, s, id) {
                    const fjs = d.getElementsByTagName(s)[0]
                    if (d.getElementById(id)) { return; }
                    const js = d.createElement(s);
                    js.id = id
                    js.src = '//connect.facebook.net/en_US/sdk.js'
                    fjs.parentNode.insertBefore(js, fjs)
                }(document, 'script', 'facebook-jssdk'))
                /* eslint-enable */
            })
        },
        getFbSdk(options) {
            return new Promise(async resolve => {
                if (window.FB) {
                    resolve(window.FB)
                } else {
                    await initFbSdk(options)
                    resolve(window.FB)
                }
            })
        },
        fbLogin(options) {
            return new Promise(resolve => {
                window.FB.login(response => resolve(response), options)
            })
        },
        fbApi(path, params) {
            return new Promise(async resolve => {
                window.FB.api(path, params, response => resolve(response));
            })
        },
        getFbLoginStatus() {
            return new Promise(resolve => {
                window.FB.getLoginStatus(response => resolve(response))
            })
        },
        fbLogout() {
            return new Promise(resolve => {
                window.FB.logout(response => resolve(response))
            })
        }
    });
};