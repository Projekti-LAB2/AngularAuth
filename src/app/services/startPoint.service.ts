import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { StartPoint } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class StartPointService {
    private baseUrl = "https://localhost:5001/api/startpoint/";

    constructor(private http: HttpClient) {}

    getStartPoints() {
        return this.http.get<StartPoint[]>(`${this.baseUrl}`);
    }

    getStartPointById(id:string) {
        return this.http.get<StartPoint>(`${this.baseUrl}${id}`);
    }
    
    updateStartPoint(id:string, value:any) {
        return this.http.put<StartPoint>(`${this.baseUrl}${id}`, value);
    }

    createStartPoint(value:any) {
        return this.http.post<StartPoint>(`${this.baseUrl}`, value);
    }

    deleteStartPoint(id:string) {
        return this.http.delete<StartPoint>(`${this.baseUrl}${id}`);
    }
}