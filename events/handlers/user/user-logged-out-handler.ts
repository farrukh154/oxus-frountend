import EventHandler from "../event-handler";

export default class UserLoggedOutHandler extends EventHandler {
    public handle(data: object): void {
        console.group("User Logged Out Handler");
        console.debug("User logged out");
        console.debug("Data", data);
        console.groupEnd();
    }
}
