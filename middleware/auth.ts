import AuthService from "../services/auth-service";

export default defineNuxtRouteMiddleware((to) => {
    let authService = new AuthService();
    if (!authService.isAuthenticated()) {
        console.warn("Aborting navigation, going to login");
        return '/login';
    }
});
