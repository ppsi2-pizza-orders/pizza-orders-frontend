import { Component, OnInit } from '@angular/core';
import { Pizza } from 'src/app/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-edit-pizza',
  templateUrl: './add-edit-pizza.component.html',
  styleUrls: ['./add-edit-pizza.component.scss']
})
export class AddEditPizzaComponent implements OnInit {
  public pizza: Pizza;
  public pizzaForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddEditPizzaComponent>,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    if (this.pizza) {
      this.pizzaForm = this.formBuilder.group({
        name: [this.pizza.name, [Validators.required]],
        price: [this.pizza.price, Validators.required]
      });
    } else {
      this.pizzaForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        price: ['', Validators.required]
      });
    }
  }

  onConfirm() {
    if (this.pizzaForm.invalid) {
      return;
    }
    this.dialogRef.close(this.pizzaForm.value);
  }

}
