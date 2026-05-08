import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAccount } from './customer-account';

describe('CustomerAccount', () => {
  let component: CustomerAccount;
  let fixture: ComponentFixture<CustomerAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerAccount],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerAccount);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
