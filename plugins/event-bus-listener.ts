import EventHandler from "../events/handlers/event-handler";
import {getBusEventHandler} from "../events/application-events";

export default defineNuxtPlugin(() => {
    const {$listen} = useNuxtApp();

    // @ts-ignore
    $listen('*', (type, e) => {
        console.group('Event captured')
        console.debug("Event:", type);
        console.debug("Payload:", e);
        console.groupEnd();

        let handlers = getBusEventHandler(type);
        handlers.forEach((handler) => {
            if (handler instanceof EventHandler) {
                handler.handle(e);
            }
        });
    });
});
