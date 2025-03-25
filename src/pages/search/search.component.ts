import { Component, inject, model, signal, ViewChild, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BookService } from '../../allservices/book.service';
import { BookData } from '../../shared/interfaces';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { AddbookComponent } from '../../components/addbook/addbook.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'title',
    'pages',
    'author',
    'isbn',
    'categories',
    'count',
    'action'
  ];
  dataSource!: MatTableDataSource<BookData>;
  readonly dialog = inject(MatDialog);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  readonly animal = signal('');
  readonly name = model('');

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.fetchBookDetails();
  }

  openDialog(addOrEdit:string, bookData?:BookData): void {
    const dialogRef = this.dialog.open(AddbookComponent, {
      data: {addOrEdit, bookData}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchBookDetails();
    });
  }

  fetchBookDetails(): void {
    this.bookService.getAllBooks().subscribe({
      next: (res: BookData[]) => {
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

openDialogCancel(rowId:string){
   const dialogRef=  this.dialog.open(DialogCancelComponent, {
      width: '250px',
      data:rowId
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.fetchBookDetails();
      
    });
  }
}




@Component({
  selector: 'app-dialog-animations-example-dialog',
  template: `<h2 mat-dialog-title>Delete Book</h2>
  <mat-dialog-content>
    Are you sure want to delete the book?
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button class="Cancel-btn" mat-dialog-close>Cancel</button>
    <button mat-button mat-dialog-close (click)="deleteData(data)" cdkFocusInitial>Yes</button>
  </mat-dialog-actions>
  `,
  styles:`
  .Cancel-btn{
    color: red;
  }
 
  `,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogCancelComponent {
  readonly dialogRef = inject(MatDialogRef<DialogCancelComponent>);
  readonly data = inject<string>(MAT_DIALOG_DATA);
  constructor(private bookService: BookService){}
  deleteData(data:string){
    this.bookService.deleteBook(data).subscribe({
      next:(res)=>{
        alert(`ID with ${res} deleted successfully`);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}