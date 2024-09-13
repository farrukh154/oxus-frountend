import {accessToken} from '../utils/auth-data'
import {toastError} from './toast';

function httpProcessing(data: any, error: any) {
  if (error.value) {
    if (error.code === 'ECONNABORTED' || error.value.statusCode >= 500) {
      toastError(`${error.value.data}`)
    } else if (error.value.statusCode === 401) {
        const router = useRouter()
        const localePath = useLocalePath()
        router.push({path: localePath('/login')});
    } else {
      toastError(JSON.stringify(error.value.data))
    }
    throw error
  }
  try {
    JSON.parse(JSON.stringify(data.value || {}))
  } catch (e) {
    toastError(String(data.value).substring(0, 300))
    throw new Error(String(data.value).substring(0, 300))
  }
}

abstract class HttpClient {
    private headers: {};
    private baseURL: string;

    protected constructor(options = {}) {
        const jwt = JSON.parse(localStorage.getItem('fr_user_jwt') || '{}')
        this.baseURL = options.baseURL || "";
        this.headers = options.headers || {};
    }

    async fetchJSON(endpoint: string, method: string, options = {}) {
        let optionsData
        if (options instanceof FormData) {
            optionsData = options
        } else {
            optionsData = Object.keys(options).length ? options : undefined
        }
        const nuxtApp = useNuxtApp()

        const {data, error} = await useFetch(`${this.baseURL}${endpoint}`, {
            method,
            body: optionsData,
            headers: {
                Authorization: `Bearer ${accessToken.value}`,
                'Accept-Language': nuxtApp.$i18n.locale.value === 'tj' ? 'tg' : nuxtApp.$i18n.locale.value
            },
        });
        httpProcessing(data, error)
        return JSON.parse(JSON.stringify(data.value || {}))
    }

    setHeader(key: string, value: string) {
        this.headers[key] = value;
        return this;
    }

    getHeader(key: string) {
        return this.headers[key];
    }

    setBasicAuth(username: string, password: string) {
        this.headers.Authorization = `Basic ${btoa(`${username}:${password}`)}`;
        return this;
    }

    setBearerAuth(token: string) {
        this.headers.Authorization = `Bearer ${token}`;
        return this;
    }

    async get(endpoint: string, options = {}) {
        return this.fetchJSON(endpoint, "GET", options);
    }

    async post(endpoint: string, options = {}) {
        return this.fetchJSON(endpoint, "POST", options);
    }

    async put(endpoint: string, options = {}) {
        return this.fetchJSON(endpoint, "PUT", options);
    }

    async patch(endpoint: string, options = {}) {
        return this.fetchJSON(endpoint, "PATCH", options);
    }

    async delete(endpoint: string, options = {}) {
        return this.fetchJSON(endpoint, "DELETE", options);
    }

    async options(endpoint: string, options = {}) {
        return this.fetchJSON(endpoint, "OPTIONS", options);
    }
}
export default HttpClient;