import { Component, inject, model, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BookDetails } from '../../shared/interfaces';
import { BookService } from '../../allservices/book.service';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-addbook',
  imports: [MatDialogModule, NgIf, ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './addbook.component.html',
  styleUrl: './addbook.component.scss'
})
export class AddbookComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<AddbookComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  readonly animal = model();

  constructor(private fb: FormBuilder, private bookService: BookService){

  }
  bookDetailGroup!: FormGroup;

ngOnInit():void{
  this.bookDetailGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    author: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    isbn:['', [Validators.required]],
    count:[0, Validators.min(0)]
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
