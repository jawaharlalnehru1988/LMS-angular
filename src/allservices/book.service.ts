import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { BookData, RegisterUser, UserWithRole } from '../shared/interfaces';
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

  borrowList:WritableSignal<BookData[]> = signal([]);
  
  itemCount = computed(()=> this.borrowList().length);
  addBookList(newBook: BookData){
    this.borrowList.update((prevBooks)=> [...prevBooks, newBook]);
  }

  updateBook(updatedItem: BookData){
    this.borrowList.update((prevBooks) => 
      prevBooks.map(book => book.id === updatedItem.id? updatedItem : book));
  }

  removeBook(id: string){
    this.borrowList.update((prevBooks) => prevBooks.filter(book => book.id !== id));
  }

  constructor(private http: HttpClient) { }

  getAllBooks(){
    return this.http.get<BookData[]>('http://localhost:3000/books');
  }

  addNewBook(book: BookData): Observable<BookData> {
    return this.http.post<BookData>('http://localhost:3001/bookapi/addbook', book)
  }

  addNewUser(user:RegisterUser){
    return this.http.post<RegisterUser>('http://localhost:3000/members', user)
  }

  getUserDetails():Observable<UserWithRole[]>{
    return this.http.get<UserWithRole[]>('http://localhost:3001/api/fetch-user')
  }

}


