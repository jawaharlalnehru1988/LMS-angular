import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BookDetails, RegisterUser, UserData, UserWithRole } from '../shared/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

   userDataSignal = signal<UserWithRole>({
     role: 'Librarian',
     username: '',
     password: '',
     email: '',
     phone: ''
   });

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

  getUserDetails(){
    return this.http.get<UserWithRole[]>('http://localhost:3000/members')
  }

}


