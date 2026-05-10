import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAuthorized } from './not-authorized';

describe('NotAuthorized', () => {
  let component: NotAuthorized;
  let fixture: ComponentFixture<NotAuthorized>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotAuthorized],
    }).compileComponents();

    fixture = TestBed.createComponent(NotAuthorized);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
