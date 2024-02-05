import { Component, OnInit } from '@angular/core';
import { HeaderPrivateComponent } from '../../core/components/header-private/header-private.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ITheme } from '../../core/components/themes/theme.model';
import { ThemesComponent } from '../../core/components/themes/themes.component';
import { AuthService } from '../../core/services/auth.service';
import { SubjectsService } from '../../core/services/subjects.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [HeaderPrivateComponent, CommonModule, ReactiveFormsModule, MatButtonModule, ThemesComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  profileForm!: FormGroup;
  themes: ITheme[] = [
    {
      id: 1,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis maxime aperiam rerum soluta quae! Dicta aperiam magnam dolor facilis molestias voluptatum vero maiores! Non dolorum saepe explicabo ipsam nostrum odit.",
      title: "Java",
      isSubscribe: true

    },
    {
      id: 2,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis maxime aperiam rerum soluta quae! Dicta aperiam magnam dolor facilis molestias voluptatum vero maiores! Non dolorum saepe explicabo ipsam nostrum odit.",
      title: "PHP",
      isSubscribe: true

    },
    {
      id: 2,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis maxime aperiam rerum soluta quae! Dicta aperiam magnam dolor facilis molestias voluptatum vero maiores! Non dolorum saepe explicabo ipsam nostrum odit.",
      title: "PHP",
      isSubscribe: true

    }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private subjectsService: SubjectsService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.subjectsService.getAll().subscribe({
      next: (response: any) => {
        // TODO ajouter description aux theme  
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
  }
}
