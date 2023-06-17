import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class APIService {
    private baseUrl: string = 'http://localhost:5000/api/User/';

    constructor(private http: HttpClient) {}

    getUsers() {
        return this.http.get<User[]>(`${this.baseUrl}`);
    }

    getUserById(id:string) {
        return this.http.get<any>(`${this.baseUrl}${id}`);
    }
    
    updateUser(id:string, value:any) {
        return this.http.put<any>(`${this.baseUrl}${id}`, value);
    }
    deleteUser(id:string) {
        return this.http.delete<any>(`${this.baseUrl}${id}`);
    }
}