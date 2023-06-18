import { City } from "./City";
import { StartPoint } from "./startPoint";

    export interface Ticket {
        ticketId: number;
        ticketNumber: string;
        price: number;
        startPointId: number;
        startPoint: StartPoint;
        cityId: number;
        city: City;
        time: string;
        date: string;
      }
      
      // export interface StartPoint {
      //   // Define properties for StartPoint if applicable
      // }
      
      // export interface City {
      //   // Define properties for City if applicable
      // }
      