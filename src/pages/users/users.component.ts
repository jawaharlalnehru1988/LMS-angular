import { UserService } from './../../allservices/user.service';
import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { BookService } from '../../allservices/book.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserWithRole } from '../../shared/interfaces';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
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
 
  constructor(private userService: UserService){}

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
    this.userService.getUserDetails().subscribe({
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

  openDialogCancel(deleteId:string): void {
    const dialogRef=  this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      data:deleteId
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.fetchUserDetails();
      
    });
  }

}



@Component({
  selector: 'dialog-animations-example-dialog',
  template: `<h2 mat-dialog-title>Delete User</h2>
  <mat-dialog-content>
    Would you like to delete the User?
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
export class DialogAnimationsExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogAnimationsExampleDialog>);
  readonly data = inject<string>(MAT_DIALOG_DATA);
  constructor(private userService: UserService){}
  deleteData(data:string){
    console.log(data);
    this.userService.deleteUser(data).subscribe({
      next:(res)=>{
        alert(`ID with ${res} deleted successfully`);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}