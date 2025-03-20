import { Component } from '@angular/core';
import { BookService } from '../../allservices/book.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  /**
   *
   */
  constructor(private bookService:BookService) {}

  ngOnInit():void{
    // this.bookService.userDataSignal()
    console.log('this.bookService.userDataSignal() :', this.bookService.userDataSignal());
  }

sideBarTitles: string[] = ["Search Books", "Borrow Books", "Borrow", "Return", "History"];
}
