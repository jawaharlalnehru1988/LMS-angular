import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators, AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserWithRole } from '../../shared/interfaces';
import { Observable, of, map, catchError } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-user',
  imports: [MatDialogModule, MatIconModule, NgIf, ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  isAdd = true;
  userDetailsGroup!: FormGroup;
  readonly dialogRef = inject(MatDialogRef<AddUserComponent>);
  readonly data = inject<{addOrEdit:string, dataToEdit?:UserWithRole}>(MAT_DIALOG_DATA);


  constructor(private formBuilder: FormBuilder) {
    this.userDetailsGroup = this.formBuilder.group({
      id: ['', [Validators.required, Validators.maxLength(4)]],
      username: ['', [Validators.required, Validators.maxLength(40)]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$'),
    
      ]],
      email: ['', [Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      phone: ['', Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      role: ['', [Validators.required, Validators.maxLength(40), Validators.minLength(3)]]
    })
  }

  ngOnInit():void{
    if(this.data.addOrEdit === 'Edit'){
      this.isAdd = false;
      this.userDetailsGroup.get('id')?.setValue(this.data.dataToEdit?.id);
      this.userDetailsGroup.get('username')?.setValue(this.data.dataToEdit?.username);
      this.userDetailsGroup.get('password')?.setValue(this.data.dataToEdit?.password);
      this.userDetailsGroup.get('email')?.setValue(this.data.dataToEdit?.email);
      this.userDetailsGroup.get('phone')?.setValue(this.data.dataToEdit?.phone);
      this.userDetailsGroup.get('role')?.setValue(this.data.dataToEdit?.role);
      }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  submit(){
    if (this.userDetailsGroup.valid) {
      console.log(this.userDetailsGroup.value);
    }

  }
}

export function customAsyncValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return of(control.value).pipe(
      map(value => value === 'invalid' ? { invalidValue: true } : null),
      catchError(() => of(null))
    );
  };
}
