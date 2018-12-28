import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offer',
  template: `
  <div class="app-offer">
  <h4>Oferty</h4>
  <hr>
  <p>Brak dostępnych ofert.</p>
  </div>
  `,
  styles: [`
    p{
      font-size: 1.2em;
      color: #5f5f5f;
    }
  `]
})
export class OfferComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
