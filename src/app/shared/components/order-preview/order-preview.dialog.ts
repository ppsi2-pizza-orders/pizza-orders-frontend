import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/IProduct';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-order-preview',
  templateUrl: './order-preview.dialog.html',
  styleUrls: ['./order-preview.dialog.scss'],
})

export class OrderPreviewDialog implements OnInit, OnDestroy {

  public orderProducts: Product[] = [];
  private subscription: Subscription;

  @Output() itemInOrderCount = new EventEmitter<number>();

  constructor(
    private dialogRef: MatDialogRef<OrderPreviewDialog>) { }

  public ngOnInit() {
    this.subscription = this.dialogRef.backdropClick().subscribe(() => this.onClose());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public totalCost() {
    return this.orderProducts.reduce((cost: number, product: Product) => cost + product.price, 0);
  }

  public onClose() {
    this.dialogRef.close(this.orderProducts);
  }

  public removeProduct(product: Product) {
    let index = this.orderProducts.indexOf(product);
    this.orderProducts.splice(index, 1);
  }

  public addProduct(product: Product) {
    this.orderProducts.push(product);
  }
}
