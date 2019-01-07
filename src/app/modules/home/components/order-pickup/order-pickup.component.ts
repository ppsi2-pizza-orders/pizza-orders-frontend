import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Restaurant } from 'src/app/core/models/Restaurant';
import { ORDER_PICKUP_TYPES } from 'src/app/core';

@Component({
  selector: 'app-order-pickup',
  templateUrl: './order-pickup.component.html',
  styleUrls: ['./order-pickup.component.scss']
})
export class OrderPickupComponent implements OnInit {
  public orderPickupForm: FormGroup;
  public phoneForm: FormGroup;
  public orderPickupTypes = ORDER_PICKUP_TYPES;
  public orderPickupType = ORDER_PICKUP_TYPES.DELIVER;
  @Input() public restaurant: Restaurant;
  @ViewChild('submitOrderPickupForm') submitOrderPickupForm: ElementRef;
  @ViewChild('submitPhoneForm') submitPhoneForm: ElementRef;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderPickupForm = this.formBuilder.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
      house_number: ['', Validators.required],
      flat_number: ['']
    });
    this.phoneForm = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.minLength(9), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });
  }

  public isFormValid(): boolean {
    this.submitForms();

    if (this.orderPickupType === ORDER_PICKUP_TYPES.DELIVER) {
      if (!this.orderPickupForm.valid) {
        window.scrollTo(0, 0);
        return false;
      }
    }

    if (!this.phoneForm.valid) {
      window.scrollTo(0, 0);
      return false;
    }

    return true;
  }

  public getPhone(): string {
    return this.phoneForm.value.phone;
  }

  public getDeliveryAddress(): string {
    if (this.orderPickupType === ORDER_PICKUP_TYPES.DELIVER) {
      const adressData = this.orderPickupForm.value;
      return `${adressData.street} ${adressData.house_number}/${adressData.flat_number} ${adressData.city}`;
    } else {
      return `${this.restaurant.address} ${this.restaurant.city}`;
    }
  }

  public getRestaurantID(): number {
    return this.restaurant.id;
  }

  private submitForms() {
    if (!!this.submitOrderPickupForm) {
      this.submitOrderPickupForm.nativeElement.click();
    }
    if (!!this.submitPhoneForm) {
    this.submitPhoneForm.nativeElement.click();
    }
  }

}
