import { Component, inject, model } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BookDetails, DialogData } from '../../shared/interfaces';
import { BookService } from '../../allservices/book.service';

@Component({
  selector: 'app-addbook',
  imports: [MatDialogModule, ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './addbook.component.html',
  styleUrl: './addbook.component.scss'
})
export class AddbookComponent {
  readonly dialogRef = inject(MatDialogRef<AddbookComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly animal = model(this.data.animal);

  constructor(private fb: FormBuilder, private bookService: BookService){

  }
  bookDetailGroup!: FormGroup;

ngOnInit():void{
  this.bookDetailGroup = this.fb.group({
    title: [''],
    author: [''],
    isbn:['']
})
}
submitData(newBookData: BookDetails) {
  console.log(newBookData);
  this.bookService.addNewBook(newBookData).subscribe({
    next:((res:BookDetails) =>{
    console.log('res :', res);

    }),
    error: (err) => console.error('err :', err),
    complete: () => console.log('complete')
  })
}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
