import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsTypesComponent } from './events-types.component';

describe('EventsTypesComponent', () => {
  let component: EventsTypesComponent;
  let fixture: ComponentFixture<EventsTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
