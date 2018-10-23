import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, ErrorStateMatcher } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control): boolean {
    return (control && control.parent.get('password').value !== control.parent.get('confirm_password').value && control.dirty);
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  error = '';
  loading = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    public dialog: MatDialog,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(9), Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required]
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
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    setTimeout(() => {
     this.dialogRef.close();
    }, 2000);
  }

}
