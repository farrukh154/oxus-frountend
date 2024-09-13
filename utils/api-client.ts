import HttpClient from "./http-client";
import {RequestError} from "./http-client";
import {toastError} from "./toast";

class ApiClient extends HttpClient {
    constructor(baseURL: string) {
        super({
            baseURL
        });
    }

    get authentication() {
        return {
            authenticate: (authenticationData: object) => new Promise((resolve, reject) => {
                let authResponse = this.post("/auth/token/obtain/", authenticationData);
                authResponse.then((response) => {
                    // if (response.status_code != 200) {
                    //     reject(ApiClient.parseError(response))
                    //     return;
                    // }
                    resolve({
                        token: {
                            access: response.access,
                            refresh: response.refresh,
                        },
                    });
                    return;
                })
                authResponse.catch(function (error) {
                    reject(ApiClient.handleRequestError(error));
                    return;
                });
            })
        }
    }

    get blackList() {
        return {
            search: (name: string, match_percentage: int) => new Promise((resolve, reject) => {
                let authResponse = this.get(`/black_list/search_person?name=${name}&match_percentage=${match_percentage}`);
                authResponse.then((response) => {
                    resolve({
                        result: response.result,
                        user: response.user,
                        current_datetime: response.current_datetime
                    });
                    return;
                });
                authResponse.catch(function (error) {
                    reject(ApiClient.handleRequestError(error));
                    return;
                });
            })
        }
    }

    static handleRequestError(error: RequestError) {
        let toastMessage = "Request failed. Please, try again.";
        if (error.cause !== undefined && error.cause.errorMessage !== undefined) {
            toastMessage = error.cause.errorMessage;
        }
        toastError(toastMessage);
        return {
            reason: "Request error",
        }
    }

    static parseError(response: object) {
        return {
            "reason": "todo: implement"
        }
    }

    static buildUrlWithQueryParams(baseUrl: string, params: { [key: string]: string | number }): string {
        const queryParams = Object.entries(params)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
        return `${baseUrl}?${queryParams}`;
    }
}

export default ApiClient;