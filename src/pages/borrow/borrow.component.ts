import { Component } from '@angular/core';
import { BookService } from '../../allservices/book.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgStyle, NgFor } from '@angular/common';
import { BookData } from '../../shared/interfaces';

@Component({
  selector: 'app-borrow',
  imports: [MatCardModule, MatButtonModule, NgStyle, NgFor],
  templateUrl: './borrow.component.html',
  styleUrl: './borrow.component.scss'
})
export class BorrowComponent {
borrowBookItems: BookData[] = [];

constructor( private bookService: BookService) {
  console.log(this.bookService.borrowList());
  this.borrowBookItems = this.bookService.borrowList();
  
}
removeFromBorrowList(item:BookData){
  this.bookService.removeBook(item._id);
}
}
