import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  URL_RESERVATIONS = 'http://localhost:8080/reservations';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient
  ) {}

  listAll(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(this.URL_RESERVATIONS);
  }

  findById(id: number): Observable<Reservation> {
    return this.httpClient.get<Reservation>(`${this.URL_RESERVATIONS}/${id}`);
  }

  add(reservation: Reservation): Observable<Reservation> {
    return this.httpClient.post<Reservation>(this.URL_RESERVATIONS, reservation, this.httpOptions);
  }

  update(reservation: Reservation): Observable<Reservation> {
    return this.httpClient.put<Reservation>(`${this.URL_RESERVATIONS}/${reservation.id}`, Reservation, this.httpOptions);
  }

  remove(id: number): Observable<object> {
    return this.httpClient.delete<Reservation>(`${this.URL_RESERVATIONS}/${id}`);
  }

}
