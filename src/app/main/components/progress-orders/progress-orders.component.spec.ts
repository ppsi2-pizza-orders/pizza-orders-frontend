import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressOrdersComponent } from './progress-orders.component';

describe('ProgressOrdersComponent', () => {
  let component: ProgressOrdersComponent;
  let fixture: ComponentFixture<ProgressOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
