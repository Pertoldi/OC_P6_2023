import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderPublicComponent } from '../../core/components/header-public/header-public.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderPublicComponent, MatButtonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  signUpForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }


  initForm() {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    const formValue = this.signUpForm.value;

    const registerSubscription = this.authService.register(formValue).subscribe({
      next: (response: any) => {
        const token = response.token;
        this.authService.setToken(token);
      },
      error: (error) => {
        //TODO a toast
        console.error('Login error:', error);
      }
    });
    this.subscription.add(registerSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
