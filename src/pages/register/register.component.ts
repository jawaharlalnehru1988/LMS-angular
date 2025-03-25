import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegisterUser, UserWithRole } from '../../shared/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';
import { Router } from '@angular/router';
import { UserService } from '../../allservices/user.service';
import { AuthService } from '../../allservices/auth.service';

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

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private authService: AuthService, ) {
    this.authForm = this.formBuilder.group({
      username: ['', [Validators.minLength(3), Validators.maxLength(40)]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$')
      ]],
      email: ['', [Validators.email, Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')
      ]],
      phone: ['', Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
   })
  }

  ngOnInit():void{
      this.userService.getUserDetails().subscribe( {
          next:(res: UserWithRole[])=>{
            this.usersDetails = res;
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
      this.userService.addNewUserAuth(this.authForm.value).subscribe({
        next:(res: RegisterUser)=>{
          this.openSnackBar();
          setTimeout(() => {
            this.isRegister = false;
          }, 2000);
        }
      });
      
    } else if(this.authForm.valid) {
        this.login({email: this.authForm.value.email, password: this.authForm.value.password});
    }
  }

  login(obj:{email: string, password: string}){
    this.authService.login(obj).subscribe({
      next:(res)=> {
        this.router.navigate(['/home']);
        sessionStorage.setItem("user", JSON.stringify(res));
      },
      error:(err)=> {
        console.error(err)
      }
    })
  }


  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.switchForm();
    }
  }

}
