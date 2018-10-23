import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { RegisterComponent } from '../register/register.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface DialogData {
  isLoggedIn: boolean;
  returnUrl: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error = '';
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  getErrorMessage(field) {
    return this.loginForm.get(field).hasError('email') ? 'Niepoprawny adres email' : '';
  }

  openRegisterDialog(): void {
    this.dialog.open(RegisterComponent);
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    setTimeout(() => {
      if (this.data != null) {
        this.data.isLoggedIn = true;
        this.dialogRef.close(this.data);
      } else {
        this.dialogRef.close();
      }
    }, 2000);
  }

  onFacebookLogin() {

  }

}
