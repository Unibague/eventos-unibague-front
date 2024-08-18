export function userCanAccessEvent(eventId, userEvents) {
    return userEvents.some(event => event.id == eventId);
}
