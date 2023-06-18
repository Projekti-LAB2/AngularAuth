import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '../models/City';

@Injectable({
  providedIn: 'root'
})
export class CityService {
    private baseUrl = "https://localhost:5001/api/city/";

    constructor(private http: HttpClient) {}

    getCities() {
        return this.http.get<City[]>(`${this.baseUrl}`);
    }

    getCityById(id:string) {
        return this.http.get<City>(`${this.baseUrl}${id}`);
    }
    
    updateCity(id:string, value:any) {
        return this.http.put<City>(`${this.baseUrl}${id}`, value);
    }

    createCity(value:any) {
        return this.http.post<City>(`${this.baseUrl}`, value);
    }

    deleteCity(id:string) {
        return this.http.delete<City>(`${this.baseUrl}${id}`);
    }
}