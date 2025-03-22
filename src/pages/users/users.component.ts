import { Component, inject, ViewChild } from '@angular/core';
import { BookService } from '../../allservices/book.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserWithRole } from '../../shared/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AddUserComponent } from '../../components/add-user/add-user.component';

@Component({
  selector: 'app-users',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  displayedColumns: string[] = [
    'id',
    'username',
    'password',
    'email',
    'phone',
    'role',
    'action'
  ];

  dataSource!: MatTableDataSource<UserWithRole>;
  readonly dialog = inject(MatDialog);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 
  constructor(private bookService: BookService){}

  ngOnInit():void{
    this.fetchUserDetails();
  }
  openDialog(addOrEdit:string, dataToEdit?:UserWithRole): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      data: {addOrEdit, dataToEdit},
    });
    dialogRef.afterClosed().subscribe(() => {
      this.fetchUserDetails();
    });
  }

  fetchUserDetails():void{
    this.bookService.getUserDetails().subscribe({
      next:(res:UserWithRole[])=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        console.log(err);
        }
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
