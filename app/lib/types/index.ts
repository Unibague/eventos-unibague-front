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