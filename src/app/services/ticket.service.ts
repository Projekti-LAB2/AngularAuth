import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
    private baseUrl = "https://localhost:5001/api/ticket/";

    constructor(private http: HttpClient) {}

    getTickets() {
        return this.http.get<Ticket[]>(`${this.baseUrl}`);
    }

    getTicketById(id:string) {
        return this.http.get<Ticket>(`${this.baseUrl}${id}`);
    }
    
    updateTicket(id:string, value:any) {
        return this.http.put<any>(`${this.baseUrl}${id}`, value);
    }

    createTicket(value:any) {
        return this.http.post<any>(`${this.baseUrl}`, value);
    }

    deleteTicket(id:string) {
        return this.http.delete<any>(`${this.baseUrl}${id}`);
    }
}