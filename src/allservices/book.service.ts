import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { BookData, UserWithRole } from '../shared/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

   userDataSignal = signal<UserWithRole>({
     _id: '',
     id: '',
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
    return this.http.get<BookData[]>('http://localhost:3001/bookapi/getbooks');
  }

  addNewBook(book: BookData): Observable<BookData> {
    return this.http.post<BookData>('http://localhost:3001/bookapi/addbook', book)
  }

  deleteBook(data:string){
    return this.http.delete<string>('http://localhost:3001/bookapi/deletebook/'+data);
  }

  updateBookDetails(id:string, book: BookData){
    return this.http.put('http://localhost:3001/bookapi/updatebook/'+id, book);
  }

}


