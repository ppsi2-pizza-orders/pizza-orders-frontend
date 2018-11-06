import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class MockBackendService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const restaurant = [
      {
        id: 1,
        name: 'Nocne gastro',
        city: 'Wrocław',
        adress: 'Żeromskiego 12',
        phone: '79298729827',
        description: 'Włoska, Makarony, Pizza',
        rate: 4.34,
        photo: '/assets/restaurant.jpg'
      },
      {
        id: 2,
        name: 'Da grasso',
        city: 'Legnica',
        adress: 'Młynarska 5',
        phone: '692893876',
        description: 'Włoska, Makarony, Pizza',
        rate: 3.34,
        photo: '/assets/dagrasso.jpg'
      },
      {
        id: 3,
        name: 'Pizzeria Hanoi Lotnicza',
        city: 'Legnica',
        adress: 'Lotnicza 5',
        phone: '692893876',
        description: 'Włoska, Makarony, Pizza',
        rate: 4.74,
        photo: '/assets/hanoi.png',
        pizzas: [
          {
            id: 1,
            name: 'Margarita',
            price: 19,
            ingredients: [
              {
                id: 1,
                name: 'ser',
                cost: 6,
                photo: '/assets/ser.png',
                available: true
              }
            ]
          },
          {
            id: 2,
            name: 'Capriciosa',
            price: 23,
            ingredients: [
              {
                id: 1,
                name: 'ser',
                cost: 6,
                photo: '/assets/ser.png',
                available: true
              },
              {
                id: 2,
                name: 'szynka',
                cost: 3,
                photo: '/assets/ser.png',
                available: true
              },
              {
                id: 3,
                name: 'pieczarki',
                cost: 4,
                photo: '/assets/pieczarki.png',
                available: true
              }
            ]
          },
          {
            id: 3,
            name: 'Wiejska',
            price: 25,
            ingredients: [
              {
                id: 1,
                name: 'ser',
                cost: 6,
                photo: '/assets/ser.png',
                available: true
              },
              {
                id: 3,
                name: 'pieczarki',
                cost: 4,
                photo: '/assets/pieczarki.png',
                available: true
              },
              {
                id: 4,
                name: 'boczek',
                cost: 5,
                photo: '/assets/boczek.png',
                available: true
              }
            ]
          },
          {
            id: 1,
            name: 'Margarita',
            price: 19,
            ingredients: [
              {
                id: 1,
                name: 'ser',
                cost: 6,
                photo: '/assets/ser.png',
                available: true
              }
            ]
          },
          {
            id: 2,
            name: 'Capriciosa',
            price: 23,
            ingredients: [
              {
                id: 1,
                name: 'ser',
                cost: 6,
                photo: '/assets/ser.png',
                available: true
              },
              {
                id: 2,
                name: 'szynka',
                cost: 3,
                photo: '/assets/ser.png',
                available: true
              },
              {
                id: 3,
                name: 'pieczarki',
                cost: 4,
                photo: '/assets/pieczarki.png',
                available: true
              }
            ]
          },
          {
            id: 3,
            name: 'Wiejska',
            price: 25,
            ingredients: [
              {
                id: 1,
                name: 'ser',
                cost: 6,
                photo: '/assets/ser.png',
                available: true
              },
              {
                id: 3,
                name: 'pieczarki',
                cost: 4,
                photo: '/assets/pieczarki.png',
                available: true
              },
              {
                id: 4,
                name: 'boczek',
                cost: 5,
                photo: '/assets/boczek.png',
                available: true
              }
            ]
          },
          {
            id: 1,
            name: 'Margarita',
            price: 19,
            ingredients: [
              {
                id: 1,
                name: 'ser',
                cost: 6,
                photo: '/assets/ser.png',
                available: true
              }
            ]
          },
          {
            id: 2,
            name: 'Capriciosa',
            price: 23,
            ingredients: [
              {
                id: 1,
                name: 'ser',
                cost: 6,
                photo: '/assets/ser.png',
                available: true
              },
              {
                id: 2,
                name: 'szynka',
                cost: 3,
                photo: '/assets/ser.png',
                available: true
              },
              {
                id: 3,
                name: 'pieczarki',
                cost: 4,
                photo: '/assets/pieczarki.png',
                available: true
              }
            ]
          },
          {
            id: 3,
            name: 'Wiejska',
            price: 25,
            ingredients: [
              {
                id: 1,
                name: 'ser',
                cost: 6,
                photo: '/assets/ser.png',
                available: true
              },
              {
                id: 3,
                name: 'pieczarki',
                cost: 4,
                photo: '/assets/pieczarki.png',
                available: true
              },
              {
                id: 4,
                name: 'boczek',
                cost: 5,
                photo: '/assets/boczek.png',
                available: true
              }
            ]
          },
        ]
      },
      {
        id: 4,
        name: 'Pizzeria Marco',
        city: 'Kraków',
        adress: 'Białska 5',
        phone: '692893876',
        description: 'Włoska, Makarony, Pizza',
        rate: 5.0,
      },
    ];
    const autocomplete = {
      cities: [
        'Wrocław',
        'Legnica',
        'Jelenia Góra',
        'Kalisz',
        'Warszawa',
        'Poznan',
        'Kraków',
        'Gdańsk',
        'Sopot',
        'Rzeszów',
        'Katowice'
      ],
      names: [
        'Pizzeria Hanoi Lotnicza',
        'Da grasso',
        'Nocne gastro',
        'Pizzeria Marco'
      ],
      pizzas: [
        'Hawajska',
        'Margarita',
        'Wiejska',
        'Peperoni'
      ]
    };
    return { restaurant, autocomplete };
  }
}
