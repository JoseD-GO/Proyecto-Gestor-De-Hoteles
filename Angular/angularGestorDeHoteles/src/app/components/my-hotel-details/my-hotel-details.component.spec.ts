import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHotelDetailsComponent } from './my-hotel-details.component';

describe('MyHotelDetailsComponent', () => {
  let component: MyHotelDetailsComponent;
  let fixture: ComponentFixture<MyHotelDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyHotelDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyHotelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
