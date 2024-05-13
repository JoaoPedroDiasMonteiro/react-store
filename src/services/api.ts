import axios, { AxiosError, type AxiosRequestConfig } from "axios"

const baseURL = 'http://localhost:8000'

const axiosInstance = axios.create({
    baseURL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
    },
    withCredentials: true,
    withXSRFToken: true,
})

const api = {
    baseURL,
    axios: axiosInstance,
    get: (url: string, config?: AxiosRequestConfig<any> | undefined) => request('get', url, config),
    post: (url: string, data?: any, config?: AxiosRequestConfig<any> | undefined) => request('post', url, data, config),
    patch: (url: string, data?: any, config?: AxiosRequestConfig<any> | undefined) => request('patch', url, data, config),
    put: (url: string, data?: any, config?: AxiosRequestConfig<any> | undefined) => request('put', url, data, config),
    delete: (url: string, config?: AxiosRequestConfig<any> | undefined) => request('delete', url, config),
    csrf: () => request('get', '/sanctum/csrf-cookie'),
}

function request(method: 'get' | 'post' | 'patch' | 'put' | 'delete', ...params: any) {
    // @ts-ignore
    const response = axiosInstance[method](...params)

    response
        .then(r => clearErrors(r.config.url))
        .catch(e => onError(e))

    return response
}

function onError(error: AxiosError) {
    addErrors(error)
    // redirectIfSessionExpired(error)
    notifyError(error)
}

function addErrors(error: AxiosError) {
    const url = error.config?.url
    // TODO:
    // @ts-ignore
    const errors = error.response?.data?.errors

    if (url && errors) {
        console.log('add errors')
    }
}

function clearErrors(path: undefined | string) {
    if (path) {
        // console.log('clear errors')
    }
}

function redirectIfSessionExpired(error: AxiosError) {
    const sessionExpiredCodes = [401, 419]
    const status = error.response?.status

    if (status && sessionExpiredCodes.indexOf(status) !== -1) {
        alert('should redirect to login')
    }
}

function notifyError(error: AxiosError) {
    // alert('error: ' + error.message)
}

export default api
