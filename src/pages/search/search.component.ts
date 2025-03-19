import { Component, inject, model, signal, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BookService } from '../../allservices/book.service';
import { UserData } from '../../shared/interfaces';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddbookComponent } from '../../components/addbook/addbook.component';

@Component({
  selector: 'app-search',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  displayedColumns: string[] = [
    'id',
    'title',
    'author',
    'isbn',
    'status',
    'borrowedId',
    'borrowedDate',
    'returnDueDate',
  ];
  dataSource!: MatTableDataSource<UserData>;
  readonly dialog = inject(MatDialog);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  readonly animal = signal('');
  readonly name = model('');

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.fetchBookDetails();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddbookComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.fetchBookDetails();

      if (result !== undefined) {
      }
    });
  }

  fetchBookDetails(): void {
    this.bookService.getAllBooks().subscribe({
      next: (res: UserData[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res);
      },
      error: (err) => console.error(err),
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
