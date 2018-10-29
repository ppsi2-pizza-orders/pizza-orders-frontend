import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-restaurant',
  templateUrl: './register-restaurant.component.html',
  styleUrls: ['./register-restaurant.component.scss']
})
export class RegisterRestaurantComponent implements OnInit {

  registerForm: FormGroup;
  error = '';
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<RegisterRestaurantComponent>,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.minLength(9), Validators.pattern('^[0-9]*$')]],
      restaurant_name: ['', Validators.required],
      city: ['', Validators.required],
      adress: ['', Validators.required]
    });
  }

  getErrorMessage(field) {
    if (field === 'phone') {
      if (this.registerForm.controls[field].hasError('minlength') ||
      this.registerForm.controls[field].hasError('pattern')) {
        return 'Niepoprawny numer telefonu';
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
     this.router.navigate([ '/managment' ]);
    }, 2000);
  }

}
