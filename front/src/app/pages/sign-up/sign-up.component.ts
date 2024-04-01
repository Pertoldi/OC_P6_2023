import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderPublicComponent } from '../../core/components/header-public/header-public.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderPublicComponent, MatButtonModule, MatSnackBarModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();
  signUpForm!: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initForm();
  }


  initForm(): void {
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    const formValue = this.signUpForm.value;

    const passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{8,}$";

    if (!formValue.password.match(passwordRegex)) {
      this.snackBar.open('Le mot de passe doit contenir au moins 1 caractère, une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial !', 'OK', {
        duration: 3000
      });
      return
    }

    this.subscription.add(this.authService.register(formValue).subscribe({
      next: (response: { token: string }) => {
        const token = response.token;
        this.authService.setToken(token);
        this.router.navigate(['/signin']);
      },
      error: (error: unknown) => {
        this.snackBar.open('Il y a un problème avec votre mail ou votre mot de passe !', 'OK', {
          duration: 3000
        });
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
