import { Component, OnInit } from '@angular/core';
import { HeaderPrivateComponent } from '../../core/components/header-private/header-private.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ITheme } from '../../core/model/theme.model';
import { ThemesComponent } from '../../core/components/themes/themes.component';
import { AuthService } from '../../core/services/auth.service';
import { SubjectsService } from '../../core/services/subjects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [HeaderPrivateComponent, CommonModule, ReactiveFormsModule, MatButtonModule, ThemesComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  profileForm!: FormGroup;
  themes: ITheme[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private subjectsService: SubjectsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.subjectsService.getById().subscribe({
      next: (response: any) => {
        this.themes = response.map((subject: ITheme) => {
          subject.isSubscribe = true;
          return subject
        })
      },
      error: (error) => {
        //TODO a toast
        console.error('Login error:', error);
      }
    })
  }

  initForm() {
    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {

  }

  diconnect() {
    this.authService.disconnect()
    this.router.navigate(['/'])
  }
}
