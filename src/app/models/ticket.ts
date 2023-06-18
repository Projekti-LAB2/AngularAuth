import { City } from "./City";
import { StartPoint } from "./startPoint";

    export interface Ticket {
        TicketId: number;
        TicketNumber: string;
        Price: number;
        StartPointId: number;
        StartPoint: StartPoint;
        CityId: number;
        City: City;
        Time: string;
        Date: string;
      }
      
   
      