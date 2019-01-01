import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Order } from 'src/app/core/models/Order';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit {

  @Input() public order: Order;
  @Output() public status: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChangeStatus() {
    this.status.emit(this.order.token);
  }

}
