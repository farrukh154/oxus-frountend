import EventHandler from "../event-handler";

export default class UserAuthorizedHandler extends EventHandler {
    public handle(data: object): void {
        console.group("User Authorized Handler");
        console.debug("User authorized");
        console.debug("Data", data);
        console.groupEnd();
    }
}
