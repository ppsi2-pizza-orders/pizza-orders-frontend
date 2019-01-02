import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offer',
  template: `
  <div class="app-offer">
  <h4>Oferty</h4>
  <hr>
  <p class="lead">Brak dostępnych ofert.</p>
  </div>
  `,
  styles: []
})
export class OfferComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
