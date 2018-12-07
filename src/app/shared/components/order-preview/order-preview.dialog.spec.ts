import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketPreviewComponent } from './basket-preview.dialog';

describe('BasketPreviewComponent', () => {
  let component: BasketPreviewComponent;
  let fixture: ComponentFixture<BasketPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
