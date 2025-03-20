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
  totalCatagories: number = 0;
  totalBooks: number = 0;
  constructor(private bookService:BookService) {}

  ngOnInit():void{
    this.fetchBooks();
  }

  fetchBooks():void{
    this.bookService.getAllBooks().subscribe({
      next: (data) => {
        this.allBookItems = data;
        this.filteredBookItems = data;
        this.segragateBooks(data);
        },
        error: (error) => {
          console.error('error :', error);
          }
    })
  }

  segragateBooks(books:UserData[]):void{
    const categoryCounts = books.reduce((acc:{ [key: string]: number }, book:UserData) => {
      if (acc[book.categories]) {
        acc[book.categories] += book.count;
      } else {
        acc[book.categories] = book.count;
      }
      return acc;
    }, {});
    
    console.log(categoryCounts);
    this.analyzeCategoryCounts(categoryCounts);
  }
  analyzeCategoryCounts(categoryCounts: { [key: string]: number | string }): void {
    const numberOfKeys: number = Object.keys(categoryCounts).length;
    const totalCount: number = Object.values(categoryCounts).reduce((acc: number, value: number | string) => {
      const numericValue: number = typeof value === 'number' ? value : 0;
      return acc + numericValue;
    }, 0);
    this.totalCatagories = numberOfKeys;
    this.totalBooks = totalCount;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredBookItems = this.allBookItems.filter(book => book.title.toLowerCase().includes(filterValue));
    } 
  }
