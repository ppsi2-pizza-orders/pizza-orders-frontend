import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { RestaurantService } from '../../../core/services/restaurant.service';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { Restaurant } from '../../../core/models/Restaurant';
import { AuthService } from 'src/app/core/services/auth.service';
import { RestaurantRoles } from 'src/app/core/utils';

@Component({
  selector: 'app-register-restaurant',
  templateUrl: './register-restaurant.component.html',
  styleUrls: ['./register-restaurant.component.scss']
})
export class RegisterRestaurantComponent implements OnInit {

  public registerForm: FormGroup;
  public errorMeesage = '';
  public loading = false;

  constructor(
    private dialogRef: MatDialogRef<RegisterRestaurantComponent>,
    private formBuilder: FormBuilder,
    private router: Router,
    private restaurantService: RestaurantService,
    private authService: AuthService,
    private snackBarService: SnackBarService) { }

  public ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.minLength(9), Validators.pattern('^[0-9]*$')]],
      name: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  public getErrorMessage(field): string {
    if (field === 'phone') {
      if (this.registerForm.controls[field].hasError('minlength') ||
      this.registerForm.controls[field].hasError('pattern')) {
        return 'Niepoprawny numer telefonu';
      }
    }
  }

  public onRegister(): void {
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    const restaurant = new Restaurant(this.registerForm.value);
    this.restaurantService.addRestaurant(restaurant).subscribe(data => {
        if (data) {
          this.dialogRef.close();
          this.snackBarService.show(data.messages[0]);
          setTimeout(() => {
            this.authService.logout();
          }, 1500);
        }
      }, error => {
        this.errorMeesage = error;
      });
  }

}
