import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillReservationComponent } from './bill-reservation.component';

describe('BillReservationComponent', () => {
  let component: BillReservationComponent;
  let fixture: ComponentFixture<BillReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillReservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
