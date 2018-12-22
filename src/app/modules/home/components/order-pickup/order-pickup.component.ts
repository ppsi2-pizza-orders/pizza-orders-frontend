import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ORDER_PICKUP_TYPES } from 'src/app/core/const';
import { Restaurant } from 'src/app/core/models/Restaurant';

@Component({
  selector: 'app-order-pickup',
  templateUrl: './order-pickup.component.html',
  styleUrls: ['./order-pickup.component.scss']
})
export class OrderPickupComponent implements OnInit {
  public orderPickupForm: FormGroup;
  public orderPickupTypes = ORDER_PICKUP_TYPES;
  public orderPickupType = this.orderPickupTypes.DELIVER;
  @Input() public restaurant: Restaurant;
  @ViewChild('submit') submit : ElementRef;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderPickupForm = this.formBuilder.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
      house_number: ['', Validators.required],
      flat_number: ['']
    });
  }

  public isFormValid(): boolean {
    if(this.orderPickupType === this.orderPickupTypes.DELIVER){
      this.submit.nativeElement.click();
      if(!this.orderPickupForm.valid){
        window.scrollTo(0, 0);
        return false;
      }
    }
    return true;
  }

}
