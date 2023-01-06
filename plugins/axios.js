import Vue from 'vue';

export default function({ app, $axios, redirect, $sentry }) {
    // $axios.onRequest(config => {
    //     config.headers['Content-Type'] = 'application/json';
    //     config.headers['Access-Control-Allow-Origin'] = "*";
    // })
    // $axios.onRequest(config => {
    //     console.log('Making request to ' + config.url)

    //     let token = app.$auth.getToken('local')

    //     if (token)
    //         $axios.setHeader('Authorization', token)
    // })
    $axios.onRequest(config => {
        // Get token
        let token = app.$auth.$storage.getLocalStorage('_token.local')
            // if logged in set header request
        if (app.$auth.loggedIn) {
            config.headers['Content-Type'] = 'application/json';
            config.headers['Access-Control-Allow-Origin'] = "*";
            $axios.setHeader('Authorization', token)
        }

        // console.log('Making request to ' + config.url)
    })

    $axios.onError(error => {

        if (error.response.status == 503) {
            redirect('/soon')
        }

        if (!error.response.status.toString().startsWith('4')) {
            $sentry.captureException(error)
        }


        var message = error.response.data;
        var requestPath = ''

        if (process.client) {
            requestPath = error.response.request.responseURL
        } else {
            requestPath = error.request.path
        }

        if (message.meta.status == 'error' && typeof message.meta != 'undefined' &&
            message.code != 422 &&
            message.code != 400 &&
            !requestPath.includes('/me')
        ) {
            Vue.swal({
                icon: 'error',
                text: message.meta.message
            });
        }

        if (typeof message.meta != undefined && typeof message.message != undefined && message.code == 422) {
            for (let name in message.message_array) {
                // Get input element by name
                let elem = document.getElementsByName(name)[0]
                    // Create new <small> element
                let newNode = document.createElement('small')
                    // Create text
                let text = document.createTextNode(message.message_array[name])
                    // Add class to <small>
                newNode.classList.add("input-error-text")
                    // Add text to <small>
                newNode.appendChild(text)
                    // Insert after input element
                elem.after(newNode)
                    // Add class error to input element
                elem.classList.add("input-error")
            }
        }

        return true
    })
}