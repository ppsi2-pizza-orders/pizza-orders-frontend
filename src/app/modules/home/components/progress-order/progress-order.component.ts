import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/core/models/Order';
import { orderStatusName, statusClass } from 'src/app/core/utils';
import { STATUS_NEW, STATUS_ACCEPTED, STATUS_REALIZATION, STATUS_DELIVERY, STATUS_FINISHED } from 'src/app/core/const';

@Component({
  selector: 'app-progress-order',
  templateUrl: './progress-order.component.html',
  styleUrls: ['./progress-order.component.scss']
})
export class ProgressOrderComponent implements OnInit {
  @Input() public order: Order;
  public orderStatusName = orderStatusName;
  public statusClass = statusClass;

  constructor() { }

  ngOnInit() {
  }

}
