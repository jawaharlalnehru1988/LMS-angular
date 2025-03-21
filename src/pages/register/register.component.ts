import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BookService } from '../../allservices/book.service';
import { RegisterUser, UserWithRole } from '../../shared/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgIf, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  isRegister = false;

  authForm!: FormGroup;
  usersDetails: UserWithRole[]=[];

  constructor(private formBuilder: FormBuilder, private bookService: BookService, private router: Router) {
    this.authForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$')
      ]],
      email: ['', [Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')
      ]],
      phone: ['', Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
   })
  }

  ngOnInit():void{
      this.bookService.getUserDetails().subscribe( {
          next:(res: UserWithRole[])=>{
            this.usersDetails = res;
            console.log('this.usersDetails :', this.usersDetails);
          },
          error(err) {
            console.log(err);
          },
        });
      
  }

  switchForm(){
    this.isRegister = !this.isRegister;
  }

  
  private _snackBar = inject(MatSnackBar);
  durationInSeconds = 5;
  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,

    });
  }
  submit(){
    if (this.authForm.valid && this.isRegister) {
      this.bookService.addNewUser(this.authForm.value).subscribe({
        next:(res: RegisterUser)=>{
          this.openSnackBar();
          setTimeout(() => {
            this.isRegister = false;
          }, 2000);
        }
      });
      
    } else if(this.authForm.valid) {
        this.findUser(this.usersDetails, this.authForm.value);      
    }
  }

  findUser(users: UserWithRole[], submitted: Pick<UserWithRole, "username" | "password"> ) {
  console.log('submitted :', submitted);
  console.log('users :', users);
    const matchedUser = users.find(user => 
      user.username === submitted.username && user.password === submitted.password
    );
    if (matchedUser) {
      console.log("User found:", matchedUser);
      this.router.navigate(["/home"]);
      sessionStorage.setItem("user", JSON.stringify(matchedUser));
      this.bookService.userDataSignal.set(matchedUser);

    } else {
      console.log("No matching user found.");
    }
  }

  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.switchForm();
    }
  }

}
