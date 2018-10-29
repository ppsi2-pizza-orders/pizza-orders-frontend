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
        photo: '/assets/restaurant.jpg'
      },
      {
        id: 2,
        name: 'Da grasso',
        city: 'Legnica',
        adress: 'Młynarska 5',
        phone: '692893876',
        description: 'Włoska, Makarony, Pizza',
        photo: '/assets/dagrasso.jpg'
      },
      {
        id: 3,
        name: 'Pizzeria Hanoi Lotnicza',
        city: 'Legnica',
        adress: 'Lotnicza 5',
        phone: '692893876',
        description: 'Włoska, Makarony, Pizza',
        photo: '/assets/hanoi.png'
      },
    ];
    return { restaurant };
  }
}