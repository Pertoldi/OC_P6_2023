import { Component, OnInit } from '@angular/core';
import { HeaderPrivateComponent } from '../../core/components/header-private/header-private.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ITheme } from '../../core/components/themes/theme.model';
import { ThemesComponent } from '../../core/components/themes/themes.component';

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
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis maxime aperiam rerum soluta quae! Dicta aperiam magnam dolor facilis molestias voluptatum vero maiores! Non dolorum saepe explicabo ipsam nostrum odit.",
      title: "Java",
      isSubscribe: true
    },
    {
      id: 2,
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis maxime aperiam rerum soluta quae! Dicta aperiam magnam dolor facilis molestias voluptatum vero maiores! Non dolorum saepe explicabo ipsam nostrum odit.",
      title: "PHP",
      isSubscribe: true
    },
    {
      id: 2,
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis maxime aperiam rerum soluta quae! Dicta aperiam magnam dolor facilis molestias voluptatum vero maiores! Non dolorum saepe explicabo ipsam nostrum odit.",
      title: "PHP",
      isSubscribe: true
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {

  }
}
