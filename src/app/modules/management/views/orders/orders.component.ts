import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public orders: Array<Order>;
  public fiteredOrders: Array<Order>;

  constructor() { }

  ngOnInit() {
    this.orders = this.fiteredOrders = [
      {
        'id': 2,
        'token': 'AnUD8OUFXapccnrC',
        'status': 'new',
        'price': '29,00',
        'delivery_address': 'Piastowska 1 Legnica',
        'phone_number': '123456789',
        'pizzas': [
          {
            'price': '15,00',
            'description': 'Custom Pizza: sos pomidorowy, ser, szynka',
            'type': 'custom'
          },
          {
            'price': '14,00',
            'description': 'Pizza \'Margherita\': sos pomidorowy, ser',
            'type': 'menu'
          }
        ]
      },
      {
        'id': 3,
        'token': 'GlwXpX54kaQr0mrl',
        'status': 'new',
        'price': '58,00',
        'delivery_address': 'Piastowska 1 Legnica',
        'phone_number': '123456789',
        'pizzas': [
          {
            'price': '15,00',
            'description': 'Custom Pizza: sos pomidorowy, ser, szynka',
            'type': 'custom'
          },
          {
            'price': '14,00',
            'description': 'Pizza \'Margherita\': sos pomidorowy, ser',
            'type': 'menu'
          },
          {
            'price': '29,00',
            'description': 'Zmodyfikowana \'Margherita\': sos pomidorowy, ser + ( sos pomidorowy, ser, szynka )',
            'type': 'menu_customized'
          }
        ]
      },
      {
        'id': 4,
        'token': 'JAJy13AJ9NCNXNcb',
        'status': 'new',
        'price': '58,00',
        'delivery_address': 'Piastowska 1 Legnica',
        'phone_number': '123456789',
        'pizzas': [
          {
            'price': '15,00',
            'description': 'Własna Pizza: sos pomidorowy, ser, szynka',
            'type': 'custom'
          },
          {
            'price': '14,00',
            'description': 'Pizza \'Margherita\': sos pomidorowy, ser',
            'type': 'menu'
          },
          {
            'price': '29,00',
            'description': 'Zmodyfikowana \'Margherita\': sos pomidorowy, ser + ( sos pomidorowy, ser, szynka )',
            'type': 'menu_customized'
          }
        ]
      },
      {
        'id': 5,
        'token': '0By8uAXQJ0tjvoAV',
        'status': 'realization',
        'price': '58,00',
        'delivery_address': 'Piastowska 1 Legnica',
        'phone_number': '123456789',
        'pizzas': [
          {
            'price': '15,00',
            'description': 'Własna Pizza: sos pomidorowy, ser, szynka',
            'type': 'custom'
          },
          {
            'price': '14,00',
            'description': 'Pizza \'Margherita\': sos pomidorowy, ser',
            'type': 'menu'
          },
          {
            'price': '29,00',
            'description': 'Zmodyfikowana \'Margherita\': sos pomidorowy, ser + ( sos pomidorowy, ser, szynka )',
            'type': 'menu_customized'
          }
        ]
      },
      {
        'id': 6,
        'token': 'Yi6e11jaQA0W5L4X',
        'status': 'new',
        'price': '58,00',
        'delivery_address': 'Długa 12 Legnica',
        'phone_number': '123341111',
        'pizzas': [
          {
            'price': '15,00',
            'description': 'Własna Pizza: sos pomidorowy, ser, szynka',
            'type': 'custom'
          },
          {
            'price': '14,00',
            'description': 'Pizza \'Margherita\': sos pomidorowy, ser',
            'type': 'menu'
          },
          {
            'price': '29,00',
            'description': 'Zmodyfikowana \'Margherita\': sos pomidorowy, ser + ( sos pomidorowy, ser, szynka )',
            'type': 'menu_customized'
          }
        ]
      },
      {
        'id': 7,
        'token': 'pb7K1nVx7lRISeYy',
        'status': 'new',
        'price': '58,00',
        'delivery_address': 'Długa 12 Legnica',
        'phone_number': '123341111',
        'pizzas': [
          {
            'price': '15,00',
            'description': 'Własna Pizza: sos pomidorowy, ser, szynka',
            'type': 'custom'
          },
          {
            'price': '14,00',
            'description': 'Pizza \'Margherita\': sos pomidorowy, ser',
            'type': 'menu'
          },
          {
            'price': '29,00',
            'description': 'Zmodyfikowana \'Margherita\': sos pomidorowy, ser + ( sos pomidorowy, ser, szynka )',
            'type': 'menu_customized'
          }
        ]
      }
    ];
  }

  filterOrders(status: number) {
    this.fiteredOrders = this.orders.filter(x => {
      if (status === 1) {
        return x.status === 'new';
      } else if (status === 2) {
        return x.status === 'realization';
      } else if (status === 3) {
        return x.status === 'ready';
      }
      return true;
    });
  }

  onChangeStatus(orderToken: string) {

  }

}
