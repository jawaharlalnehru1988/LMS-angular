import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { BookData, PaginatedBookData, UserWithRole } from '../shared/interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

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
    this.borrowList.update((prevBooks) => prevBooks.filter(book => book._id !== id));
  }

  constructor(private http: HttpClient) { }
  baseURL = environment.apiUrl + "/bookapi";

  getAllBooks(){
    return this.http.get<BookData[]>(`${this.baseURL}/getbooks`);
  }

  addNewBook(book: BookData): Observable<BookData> {
    return this.http.post<BookData>(`${this.baseURL}/addbook`, book)
  }

  deleteBook(data:string){
    return this.http.delete<string>(`${this.baseURL}/deletebook/`+data);
  }

  updateBookDetails(id:string, book: BookData){
    return this.http.put(`${this.baseURL}/updatebook/`+id, book);
  }

  getPaginatedBooks(page: number, limit: number): Observable<PaginatedBookData> {
    return this.http.get<PaginatedBookData>(`${this.baseURL}/books/?page=${page}&limit=${limit}`);
  };

}


