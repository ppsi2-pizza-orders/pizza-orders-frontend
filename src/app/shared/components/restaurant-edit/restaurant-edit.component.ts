import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Restaurant } from 'src/app/core';

@Component({
  selector: 'app-restaurant-edit',
  templateUrl: './restaurant-edit.component.html',
  styleUrls: ['./restaurant-edit.component.scss']
})
export class RestaurantEditComponent implements OnInit {
  public restaurant: Restaurant;
  public restaurantForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<RestaurantEditComponent>,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.restaurantForm = this.formBuilder.group({
      name: [this.restaurant.name, [Validators.required]],
      city: [this.restaurant.city, Validators.required],
      phone: [this.restaurant.phone, Validators.required],
      address: [this.restaurant.address, Validators.required],
      description: [this.restaurant.description],
      photo: [],
      filename: []
    });
  }

  onConfirm() {
    const uploadData = new FormData();
    uploadData.append('name', this.restaurantForm.get('name').value);
    uploadData.append('city', this.restaurantForm.get('city').value);
    uploadData.append('phone', this.restaurantForm.get('phone').value);
    uploadData.append('address', this.restaurantForm.get('address').value);
    uploadData.append('description', this.restaurantForm.get('description').value);
    if (this.restaurantForm.get('photo').value) {
      uploadData.append('photo', this.restaurantForm.get('photo').value);
    }

    this.dialogRef.close(uploadData);
  }

  selectedImage(event) {
    this.restaurantForm.patchValue({photo: event.target.files[0]});
    this.restaurantForm.patchValue({filename: event.target.files[0].name});
  }

}
