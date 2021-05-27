import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsHotelComponent } from './bills-hotel.component';

describe('BillsHotelComponent', () => {
  let component: BillsHotelComponent;
  let fixture: ComponentFixture<BillsHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillsHotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
