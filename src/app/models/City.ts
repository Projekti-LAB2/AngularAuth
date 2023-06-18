import { Ticket } from "./ticket";

export interface City {
    CityId: number;
    CityName: string;
    // tickets: Ticket[];
    offers: Offer[];
  }
  
  interface Offer {
    // Define the properties of the Offer class here
  }
  