export interface Event {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  restrictedAccess: boolean;
  cardImageUrl: string;
}

export interface EventMessage {
  id: string;
  content: string;
  createdAt: string;
}

export interface Payload {
  url: string;
  redirectUrl?: string; // Make optional if it might not always be present
}

export interface EventFile {
  id: string;
  name: string;
  type: string;
  payload: Payload; // Define the payload property using the Payload interface
}
