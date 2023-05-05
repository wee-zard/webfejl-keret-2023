import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasClockComponent } from './gas-clock.component';

describe('GasClockComponent', () => {
  let component: GasClockComponent;
  let fixture: ComponentFixture<GasClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GasClockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GasClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
