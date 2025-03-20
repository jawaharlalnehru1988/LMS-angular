import { Component } from '@angular/core';
import { BookService } from '../../allservices/book.service';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { NgFor, NgStyle } from '@angular/common';
import { UserData } from '../../shared/interfaces';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-home',
  imports: [MatCardModule,MatInputModule, MatIconModule, MatButtonModule, NgStyle, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
 
  allBookItems: UserData[] = [];
  filteredBookItems: UserData[] = [];
  constructor(private bookService:BookService) {}

  ngOnInit():void{
    console.log('this.bookService.userDataSignal() :', this.bookService.userDataSignal());
    this.fetchBooks();
  }

  fetchBooks():void{
    this.bookService.getAllBooks().subscribe({
      next: (data) => {
        console.log('data :', data);
        this.allBookItems = data;
        this.filteredBookItems = data;
        },
        error: (error) => {
          console.error('error :', error);
          }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    console.log('filterValue :', filterValue); 
    this.filteredBookItems = this.allBookItems.filter(book => book.title.toLowerCase().includes(filterValue));
    console.log('this.filteredBookItems :', this.filteredBookItems);
    } 
  }
