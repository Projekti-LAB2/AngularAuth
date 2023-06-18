import { Ticket } from "./ticket";

export interface City {
    cityId: number;
    cityName: string;
    // tickets: Ticket[];
    offers: Offer[];
  }
  
  interface Offer {
    // Define the properties of the Offer class here
  }
  