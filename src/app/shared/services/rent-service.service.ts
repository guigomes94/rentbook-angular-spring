import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rent } from '../models/rent.model';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  URL_RENTS = 'http://localhost:8080/rents';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient
  ) {}

  listAll(): Observable<Rent[]> {
    return this.httpClient.get<Rent[]>(this.URL_RENTS);
  }

  listLastRents(): Observable<Rent[]> {
    return this.httpClient.get<Rent[]>(`${this.URL_RENTS}/lastrents`);
  }

  listNextDevolutions(): Observable<Rent[]> {
    return this.httpClient.get<Rent[]>(`${this.URL_RENTS}/nextdevolutions`);
  }

  findById(id: number): Observable<Rent> {
    return this.httpClient.get<Rent>(`${this.URL_RENTS}/${id}`);
  }

  add(rent: Rent): Observable<Rent> {
    return this.httpClient.post<Rent>(this.URL_RENTS, rent, this.httpOptions);
  }

  update(rent: Rent): Observable<Rent> {
    return this.httpClient.put<Rent>(`${this.URL_RENTS}/${rent.id}`, rent, this.httpOptions);
  }

}
