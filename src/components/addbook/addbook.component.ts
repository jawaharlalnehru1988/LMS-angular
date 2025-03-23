import { Component, inject, model, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BookData } from '../../shared/interfaces';
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
  readonly data = inject<{addOrEdit:string, bookData?:BookData}>(MAT_DIALOG_DATA);
  readonly animal = model();
  bookDetailGroup!: FormGroup;

  constructor(private fb: FormBuilder, private bookService: BookService){
    this.bookDetailGroup = this.fb.group({
      id:["", Validators.required],
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      pages: ["", [Validators.required, Validators.min(1), Validators.max(1000)]],
      author: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      isbn:['', [Validators.required]],
      image:[''],
      categories:[''],
      count:["", Validators.min(1)]
  });

  }

ngOnInit():void{
  if (this.data.addOrEdit === "Edit") {
    this.bookDetailGroup.get("id")?.setValue(this.data.bookData?.id);
    this.bookDetailGroup.get("title")?.setValue(this.data.bookData?.title);
    this.bookDetailGroup.get("pages")?.setValue(this.data.bookData?.pages);
    this.bookDetailGroup.get("author")?.setValue(this.data.bookData?.author);
    this.bookDetailGroup.get("isbn")?.setValue(this.data.bookData?.isbn);
    this.bookDetailGroup.get("image")?.setValue(this.data.bookData?.image);
    this.bookDetailGroup.get("categories")?.setValue(this.data.bookData?.categories);
    this.bookDetailGroup.get("count")?.setValue(this.data.bookData?.count);

  }
}
submitData() {
  if (this.bookDetailGroup.valid) {
    if (this.data.addOrEdit === 'Edit') {
      this.updateBookDetails();
    } else {
      this.addBooks();
    }        
  }
}

addBooks(){
  this.bookService.addNewBook(this.bookDetailGroup.value).subscribe({
    next:((res:BookData) =>{
    console.log('res :', res);
    }),
    error: (err) => console.error('err :', err),
    complete: () => console.log('complete')
  });
}

updateBookDetails(){
  if(this.data.bookData){
    this.bookService.updateBookDetails(this.data.bookData?._id, this.bookDetailGroup.value).subscribe({
      next:(res)=>{
        console.log('res :', res);
      },
      error:(err)=>{
        console.error('err :', err);
      }
    })
  }
}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
