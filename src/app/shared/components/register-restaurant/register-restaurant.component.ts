import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../models/Restaurant';

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
    private restaurantService: RestaurantService) { }

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
    let restaurant = new Restaurant(this.registerForm.value);
    this.restaurantService.addRestaurant(restaurant).subscribe(data => {
        if(data){
          this.dialogRef.close();
          this.router.navigate([ '/managment' ]);
        }
      }, error => {
        this.errorMeesage = error;
      });
  }

}
