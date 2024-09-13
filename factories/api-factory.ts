import ApiClient from "../utils/api-client";

class ApiFactory {
    static build() {
        const config = useRuntimeConfig()
        return new ApiClient(config.public.apiBase);
    }
}

export default ApiFactory;