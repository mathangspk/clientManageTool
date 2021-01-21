import axios from 'axios'
import * as Config from '../../constants'

export default function callApi(endpoint, method = 'GET', body, config) {
    return axios({
        method: method,
        url: `${Config.API_ENDPOINT}/${endpoint}`,
        data: body,
        config
    })
}

export function getWithToken(endpoint, token, data) {
    //const url = "https://api.yensaochampa.icu/api/orders";
    let params = []
    if (data) {
        Object.keys(data.params).forEach(function(key) {
            params.push(`${key}=${data.params[key]}`)
        });
    }
    const url = `${Config.API_ENDPOINT}/${endpoint}${params.length > 0 ? `?${params.join('&')}` : ''}`
    const options = {
        method: 'GET',
        headers: { "Content-type": "application/json", 'auth-token': token },
        url, //@https://api.yensaochampa.icu/api/orders
    };
    return axios(options)
}

export function postWithToken(endpoint, token, data) {
    //const url = "https://api.yensaochampa.icu/api/orders";
    const url = `${Config.API_ENDPOINT}/${endpoint}`
    const options = {
        method: 'POST',
        headers: { "Content-type": "application/json", 'auth-token': token },
        url, //@https://api.yensaochampa.icu/api/orders,
        data,
    };
    return axios(options)
}

export function deleteWithToken(endpoint, token, id) {
    const url = `${Config.API_ENDPOINT}/${endpoint}/${id}`
    const options = {
        method: 'DELETE',
        headers: { "Content-type": "application/json", 'auth-token': token },
        url, //@https://api.yensaochampa.icu/api/orders/id,
    };
    return axios(options)
}

export function patchWithToken(endpoint, token, id, data) {
    const url = `${Config.API_ENDPOINT}/${endpoint}/${id}`
    const options = {
        method: 'PATCH',
        headers: { "Content-type": "application/json", 'auth-token': token },
        url, //@https://api.yensaochampa.icu/api/orders/id,
        data,
    };
    return axios(options)
}
export function postImagesWithToken(endpoint, token, listFile) {

    const url = `${Config.API_ENDPOINT}/${endpoint}/`; //@https://api.yensaochampa.icu/api/upload/upload-photos,
    const config = {
        headers: { 'content-type': 'multipart/form-data', 'auth-token': token },
    }
    let formData = new FormData();
    for (let i = 0; i < listFile[0].length; i++) {
        formData.append('photos', listFile[0][i])
    }
    return axios.post(url, formData, config)
}


export function deleteImageWithToken(endpoint, token, filename) {
    const url = `${Config.API_ENDPOINT}/${endpoint}/${filename}`
    const options = {
        method: 'DELETE',
        headers: { "Content-type": "application/json", 'auth-token': token },
        url, //@https://api.yensaochampa.icu/api/upload/image/:filename,
    };
    return axios(options)
}
