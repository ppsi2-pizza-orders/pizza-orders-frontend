import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../register/register.component';
import { MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'app-register-restaurant',
  templateUrl: './register-restaurant.component.html',
  styleUrls: ['./register-restaurant.component.scss']
})
export class RegisterRestaurantComponent implements OnInit {

  registerForm: FormGroup;
  error = '';
  loading = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<RegisterRestaurantComponent>,
    public dialog: MatDialog,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(9), Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required],
      restaurant_name: ['', Validators.required],
      city: ['', Validators.required],
      adress: ['', Validators.required]
    }, {validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirm_password.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  getErrorMessage(field) {
    if (field === 'phone') {
      if (this.registerForm.controls[field].hasError('minlength') ||
      this.registerForm.controls[field].hasError('pattern')) {
        return 'Niepoprawny numer telefonu';
      }
    }
    if (field === 'email') {
      if (this.registerForm.controls[field].hasError('email')) {
        return 'Niepoprawny adres email';
      }
    }
    if (field === 'password') {
      if (this.registerForm.controls[field].hasError('minlength')) {
        return 'Hasło musi zawierać co najmniej 6 znaków';
      }
    }
    if (field === 'confirm_password') {
      if (this.registerForm.hasError('notSame')) {
        return 'Hasło są rózne';
      }
    }
  }

  onRegister() {
    console.log(this.registerForm);
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    setTimeout(() => {
     this.dialogRef.close();
    }, 2000);
  }

}
