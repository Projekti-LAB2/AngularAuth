import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Offer from '../models/offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
    private baseUrl = "https://localhost:5001/api/offer/";

    constructor(private http: HttpClient) {}

    getOffers() {
        return this.http.get<Offer[]>(`${this.baseUrl}`);
    }

    getOfferById(id:string) {
        return this.http.get<Offer>(`${this.baseUrl}${id}`);
    }
    
    updateOffer(id:string, value:any) {
        return this.http.put<any>(`${this.baseUrl}${id}`, value);
    }

    createOffer(value:any) {
        return this.http.post<any>(`${this.baseUrl}`, value);
    }

    deleteOffer(id:string) {
        return this.http.delete<any>(`${this.baseUrl}${id}`);
    }
}