import {z} from "zod";
import ApiFactory from "../factories/api-factory";
import {EVENT_USER_AUTHORIZED, EVENT_USER_LOGGED_OUT} from "../events/application-events";
import {resetAuthData, accessToken, setAuthData, user} from '../utils/auth-data'

class AuthService {
    async authenticate(username: string, password: string) {
        this.removeActiveAuthentication();

        return this.sendRequest(username, password)
            .then((data) => {
                this.authenticationSucceed(data);
                return true;
            })
            .catch((error) => {
                this.authenticationFailed(error);
                return false;
            });
    }

    private removeActiveAuthentication() {
        resetAuthData()
    }

    private async sendRequest(username: string, password: string) {
        let apiClient = ApiFactory.build();
        return apiClient.authentication.authenticate({
            username: username,
            password: password,
        });
    }

    private authenticationFailed(error: Error) {
        console.error(error);
    }

    private async authenticationSucceed(data: object) {
        console.debug("Authenticated successfully");
        setAuthData(data.token)
        let apiClient = ApiFactory.build();
        const res = await apiClient.get('/auth/me/')
        user.value = res
        this.notifyAuth();

        console.debug("Storage updated successfully");
    }

    private notifyAuth() {
        const { $event } = useNuxtApp()
        $event(EVENT_USER_AUTHORIZED, {username: 'daler'});
    }

    isAuthenticated() {
        let jwt = accessToken.value;
        if (!jwt) {
            return false;
        }
        return true;
    }

    static deleteAuthentication() {
        let authService = new AuthService()
        authService.removeActiveAuthentication();
    }

    private notifyLogout() {
        const {$event} = useNuxtApp()
        $event(EVENT_USER_LOGGED_OUT, {});
    }
}

export default AuthService;