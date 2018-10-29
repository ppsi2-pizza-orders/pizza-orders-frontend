import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  restaurantId: number;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  //  this.router.routerState.parent(this.route)
  //  .params.subscribe(params => {
  //    this.restaurantId = +params['id'];
  //    console.log(this.restaurantId);
  //  });
  this.restaurantId = +this.route.snapshot.paramMap.get('id');
  console.log(this.restaurantId);
 }

}
