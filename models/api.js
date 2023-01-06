const model = ($axios, endpointGlobal) => ({
    get(endpoint, paramsData, showDataOnly = true) {
        switch(typeof endpoint) {
            case 'object':
                var url = `${endpointGlobal}`
                break
            case 'undefined':
                var url = `${endpointGlobal}`
                break
            default:
                var url = `${endpointGlobal}/${endpoint}`
                break
        }

        let params = paramsData
        let showData = showDataOnly

        if (typeof endpoint == 'object') {
            params = endpoint
        }

        if (typeof paramsData == 'boolean') {
            showData = paramsData
        }

        let getData = $axios.get(url.replace('undefined/', ''), {
            params: params
        })

        if (showData) {
            return getData.then((res) => {
                if (res.data) {
                    return res.data.data
                }
    
                return false
            });
        }

        return getData
    },
    post(endpoint, paramsData, formData = false) {
        switch(typeof endpoint) {
            case 'object':
                var url = `${endpointGlobal}`
                break
            case 'undefined':
                var url = `${endpointGlobal}`
                break
            default:
                var url = `${endpointGlobal}/${endpoint}`
                break
        }

        let params = paramsData

        if (typeof endpoint == 'object') {
            params = endpoint
        }

        let body = params

        if (formData) {
            body = new FormData()

            for (let param in params) {
                body.append(param, params[param])
            }
        }

        return $axios.post(url.replace('undefined/', ''), body)
        .then((res) => {
            if (res.data) {
                return res.data
            }
            
            return false
        })
    },
    postMultipart(endpoint, paramsData) {
        switch(typeof endpoint) {
            case 'object':
                var url = `${endpointGlobal}`
                break
            case 'undefined':
                var url = `${endpointGlobal}`
                break
            default:
                var url = `${endpointGlobal}/${endpoint}`
                break
        }

        let params = paramsData

        if (typeof endpoint == 'object') {
            params = endpoint
        }
        let body = new FormData()

        for (let param in params) {
            if (params[param])
                body.append(param, params[param])
        }

        return $axios.post(
            url.replace('undefined/', ''), 
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        .then((res) => {
            if (res.data) {
                return res.data
            }

            return false
        })
    }
})

export default ({
    $axios
}, inject) => {
    inject('api', model($axios))
    inject('apiModel', model)
}
