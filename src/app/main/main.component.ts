import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, DoCheck {
  private url: String;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  ngDoCheck() {
    this.url = this.router.url;
  }

  getBackground(): String {
    return (this.url === '/') ? 'bg-home' : 'bg-default';
  }

}
