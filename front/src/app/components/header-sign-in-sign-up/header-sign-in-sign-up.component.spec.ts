import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSignInSignUpComponent } from './header-sign-in-sign-up.component';

describe('HeaderSignInSignUpComponent', () => {
  let component: HeaderSignInSignUpComponent;
  let fixture: ComponentFixture<HeaderSignInSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderSignInSignUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderSignInSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
