import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../models/author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  URL_AUTHORS = 'http://localhost:8080/authors';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient
  ) {}

  listAll(): Observable<Author[]> {
    return this.httpClient.get<Author[]>(this.URL_AUTHORS);
  }

  findById(id: number): Observable<Author> {
    return this.httpClient.get<Author>(`${this.URL_AUTHORS}/${id}`);
  }

  add(author: Author): Observable<Author> {
    return this.httpClient.post<Author>(this.URL_AUTHORS, author, this.httpOptions);
  }

  update(author: Author): Observable<Author> {
    return this.httpClient.put<Author>(`${this.URL_AUTHORS}/${author.id}`, author, this.httpOptions);
  }

  remove(id: number): Observable<object> {
    return this.httpClient.delete<Author>(`${this.URL_AUTHORS}/${id}`);
  }
}
