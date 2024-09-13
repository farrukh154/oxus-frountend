import mitt from 'mitt'
import type {ApplicationEvents} from "../events/application-events";

export default defineNuxtPlugin(() => {
    const emitter = mitt<ApplicationEvents>();

    return {
        provide: {
            event: emitter.emit,
            listen: emitter.on,
        }
    };
});
