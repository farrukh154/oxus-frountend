import type {ToastOptions} from "vue3-toastify";

const defaultOptions = {
    autoClose: 3000,
    hideProgressBar: true,
    position: "top-right",
    pauseOnHover: true,
    transition: "slide"
} as ToastOptions;

function toastInfo(message: string) {
    let options = defaultOptions;
    options.type = "info";

    toastMake(message, options);
}

function toastSuccess(message: string) {
    let options = defaultOptions;
    options.type = "success";

    toastMake(message, options);
}

function toastError(message: string) {
    let options = defaultOptions;
    options.type = "error";

    toastMake(message, options);
}

function toastWarning(message: string) {
    let options = defaultOptions;
    options.type = "warning";

    toastMake(message, options);
}

function toastMake(
    toastMessage: string,
    options: ToastOptions
) {
    const nuxtApp = useNuxtApp();
    nuxtApp.$toast(toastMessage, options);
}

export {
    toastInfo,
    toastSuccess,
    toastError,
    toastWarning,
    toastMake,
};