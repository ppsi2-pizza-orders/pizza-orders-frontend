import { Component, OnInit } from '@angular/core';
import { MatDialogRef, ErrorStateMatcher, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

export interface DialogData {
  isLoggedIn: boolean;
  userRole: Array<string>;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control): boolean {
    return (control && control.parent.get('password').value !== control.parent.get('password_confirmation').value && control.dirty);
  }
}

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit {

  public dialogData: DialogData = {
    isLoggedIn: false,
    userRole: []
  };
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public currentForm = 'loginForm';
  public loginError = '';
  public registerError = '';
  public loadingSpinner = false;
  public matcher = new MyErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<AuthDialogComponent>,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required]
    }, {validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.password_confirmation.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  switchForm() {
    this.currentForm = 'registerForm';
  }

  getValidateMessage(field) {
    if (field === 'email') {
      if (this.registerForm.controls[field].hasError('email')) {
        return 'Niepoprawny adres email';
      }
      if (this.loginForm.get(field).hasError('email')) {
        return 'Niepoprawny adres email';
      }
    }
    if (field === 'password') {
      if (this.registerForm.controls[field].hasError('minlength')) {
        return 'Hasło musi zawierać co najmniej 6 znaków';
      }
    }
    if (field === 'password_confirmation') {
      if (this.registerForm.hasError('notSame')) {
        return 'Hasła są różne';
      }
    }
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loadingSpinner = true;
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.auth.login(email, password).subscribe(
      (user) => {
        this.dialogData.isLoggedIn = true;
        this.dialogData.userRole = user['roles'];
        this.confirmAndClose();
      },
      (err) => {
        this.loadingSpinner = false;
        this.loginError = err.error.messages;
      }
    );
  }

  onRegister() {
    if (this.registerForm.invalid) {
      return;
    }
    this.loadingSpinner = true;
    this.auth.register(this.registerForm.value).subscribe(
      (user) => {
        this.dialogData.isLoggedIn = true;
        this.dialogData.userRole = user.roles;
        this.confirmAndClose();
      },
      (err) => {
        this.loadingSpinner = false;
        this.registerError = err.error.messages;
      }
    );
  }

  onFacebookLogin() {
    this.loadingSpinner = true;
    this.auth.facebookLogin().subscribe(
      (user) => {
          this.dialogData.isLoggedIn = true;
          this.dialogData.userRole = user.roles;
          this.confirmAndClose();
      },
      (err) => {
        this.loadingSpinner = false;
        this.loginError = err.message;
        this.registerError = err.message;
      }
    );
  }

  confirmAndClose(){
    this.loadingSpinner = false;
    this.dialogRef.close(this.dialogData);
    this.snackBar.open('Zalogowano!', '',{
      duration: 1500,
      panelClass: 'snackBarStyle'
    });
  }

}
