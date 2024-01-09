import { Component, OnDestroy, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HeaderPublicComponent } from "../../core/components/header-public/header-public.component";
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  imports: [ReactiveFormsModule, HeaderPublicComponent, MatButtonModule, MatFormFieldModule, MatInputModule],
  providers: [AuthService]
})
export class SignInComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  signInForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    const formValue = this.signInForm.value;

    const loginSubscription = this.authService.login(formValue).subscribe({
      next: (response: any) => {
        const token = response.token;
        this.authService.setToken(token);
      },
      error: (error) => {
        //TODO a toast
        console.error('Login error:', error);
      },
    }
    );

    this.subscription.add(loginSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
