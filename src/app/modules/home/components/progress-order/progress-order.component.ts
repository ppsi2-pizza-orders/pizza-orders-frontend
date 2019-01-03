import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/core/models/Order';
import { orderStatusName } from 'src/app/core/utils';
import { STATUS_NEW, STATUS_ACCEPTED, STATUS_REALIZATION, STATUS_DELIVERY, STATUS_FINISHED } from 'src/app/core/const';

@Component({
  selector: 'app-progress-order',
  templateUrl: './progress-order.component.html',
  styleUrls: ['./progress-order.component.scss']
})
export class ProgressOrderComponent implements OnInit {
  @Input() public order: Order;
  public orderStatusName = orderStatusName;

  constructor() { }

  ngOnInit() {
  }

  statusClass(status: string): string {
    switch (status) {
      case STATUS_NEW: return 'badge-secondary';
      case STATUS_ACCEPTED: return 'badge-primary';
      case STATUS_REALIZATION: return 'badge-warning';
      case STATUS_DELIVERY: return 'badge-info';
      case STATUS_FINISHED: return 'badge-success';
    }
  }

}
