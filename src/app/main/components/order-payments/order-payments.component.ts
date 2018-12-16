import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PAYMENTS } from 'src/app/shared/const';

@Component({
  selector: 'app-order-payments',
  templateUrl: './order-payments.component.html',
  styleUrls: ['./order-payments.component.scss']
})
export class OrderPaymentsComponent implements OnInit {
  public payments = PAYMENTS;
  @Output() public submit: EventEmitter<Event> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public onSubmit(event){
    this.submit.emit(event);
  }

}
