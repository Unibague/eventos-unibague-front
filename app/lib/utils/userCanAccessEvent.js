export function userCanAccessEvent(eventId, userEvents) {
    return userEvents.some(event => event.id == eventId);
}

// export function userCanAccessEvent(eventId: number, userEvents: []) {
//     return userEvents.some(event => event.id == eventId);
// }