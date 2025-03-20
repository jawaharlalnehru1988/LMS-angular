import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookDetails, RegisterUser, UserData } from '../shared/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getAllBooks(){
    return this.http.get<UserData[]>('http://localhost:3000/books');
  }

  addNewBook(book: BookDetails): Observable<BookDetails> {
    return this.http.post<BookDetails>('http://localhost:3000/books', book)
  }

  addNewUser(user:RegisterUser){
    return this.http.post<RegisterUser>('http://localhost:3000/members', user)
  }
}
