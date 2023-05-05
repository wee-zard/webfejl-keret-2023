import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressSuccessfulComponent } from './address-successful.component';

describe('AddressSuccessfulComponent', () => {
  let component: AddressSuccessfulComponent;
  let fixture: ComponentFixture<AddressSuccessfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressSuccessfulComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
