import EventHandler from "./handlers/event-handler"
import UserAuthorizedHandler from "./handlers/user/user-authorized-handler"
import UserLoggedOutHandler from "./handlers/user/user-logged-out-handler";

export const EVENT_USER_AUTHORIZED = 'user:authorized';
export const EVENT_USER_LOGGED_OUT = 'user:logged_out';

export type ApplicationEvents = {
    EVENT_USER_AUTHORIZED: object,
    EVENT_USER_LOGGED_OUT: object,
}

export function getBusEventHandler(type: string) {
    let handlers = [];
    switch (type) {
        case EVENT_USER_AUTHORIZED:
            handlers.push(new UserAuthorizedHandler());
            break;
        case EVENT_USER_LOGGED_OUT:
            handlers.push(new UserLoggedOutHandler());
            break;
        default:
            break;
    }
    return handlers;
}
