import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { RegisterComponent } from '../register/register.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

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
    private formBuilder: FormBuilder,
    private authService: AuthService) { }

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
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.authService.login(email, password).subscribe(
      (data) => {
        this.data.isLoggedIn = true;
        this.dialogRef.close(this.data);
      },
      (err) => {
        this.error = err;
      }
    );
  }

  onFacebookLogin() {
    this.authService.facebookLogin().subscribe(
      (data) => {
        this.data.isLoggedIn = true;
        this.dialogRef.close(this.data);
      },
      (err) => {
        this.error = err;
      }
    );
  }

}
