import { Component, OnInit, signal } from '@angular/core';
import { BookService } from '../../allservices/book.service';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { NgFor, NgStyle } from '@angular/common';
import { BookData } from '../../shared/interfaces';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-home',
  imports: [MatCardModule,MatInputModule, MatIconModule, MatButtonModule, NgStyle, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
 
  allBookItems: BookData[] = [];
  filteredBookItems: BookData[] = [];
  totalCatagories = 0;
  totalBooks = 0;
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

  segragateBooks(books:BookData[]):void{
    const categoryCounts = books.reduce((acc:Record<string, number>, book:BookData) => {
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
  analyzeCategoryCounts(categoryCounts: Record<string, number | string>): void {
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

    addToBorrowList(item:BookData):void{
      const itemCount = this.bookService.itemCount; 
      if (  itemCount() < 3){
        this.bookService.addBookList(item);
      } else{
        alert('You can borrow only 3 books at a time.');
      }
    }
  }
