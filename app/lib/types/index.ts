export interface User {
  id: string;
  name: string;
  email: string;
  unreadMessages: boolean;
  eventsAdmin: Event[],
  restrictedEvents : Event[],
  nonRestrictedEvents : Event[],
  accessibleEvents: Event[],
  roles: Role[];
}

export interface Role{
  id: string,
  name:string,
  customId: number,
}


export interface Event {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  restrictedAccess: boolean;
  cardImageUrl: string;
  users: User[] | [];
  admins: User[] | [];
}

export interface EventMessage {
  id: string;
  content: string;
  createdAt: string;
}

export interface Payload {
  source: string;
  redirectUrl?: string; // Make optional if it might not always be present
}

export interface EventFile {
  id: string;
  name: string;
  type: string;
  payload: Payload; // Define the payload property using the Payload interface
}

export interface EventMeeting {
  id: string;
  name: string;
  description:string,
  speaker: string,
  location: string,
  startDate: string,
  endDate: string,
  onlineLink: string
}

