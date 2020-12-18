import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  URL_BOOKS = 'http://localhost:8080/books';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient
  ) {}

  listAll(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(this.URL_BOOKS);
  }

  listAvailables(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${this.URL_BOOKS}/availables`);
  }

  findById(id: number): Observable<Book> {
    return this.httpClient.get<Book>(`${this.URL_BOOKS}/${id}`);
  }

  add(book: Book): Observable<Book> {
    return this.httpClient.post<Book>(this.URL_BOOKS, book, this.httpOptions);
  }

  update(book: Book): Observable<Book> {
    return this.httpClient.put<Book>(`${this.URL_BOOKS}/${book.id}`, book, this.httpOptions);
  }

  remove(id: number): Observable<object> {
    return this.httpClient.delete<Book>(`${this.URL_BOOKS}/${id}`);
  }
}
