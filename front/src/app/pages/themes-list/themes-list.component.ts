import { Component } from '@angular/core';
import { HeaderPrivateComponent } from '../../core/components/header-private/header-private.component';
import { ITheme } from '../../core/components/themes/theme.model';
import { ThemesComponent } from '../../core/components/themes/themes.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-themes-list',
  standalone: true,
  imports: [HeaderPrivateComponent, ThemesComponent, CommonModule],
  templateUrl: './themes-list.component.html',
  styleUrl: './themes-list.component.scss'
})
export class ThemesListComponent {
  themes: ITheme[] = [
    {
      id: 1,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis maxime aperiam rerum soluta quae! Dicta aperiam magnam dolor facilis molestias voluptatum vero maiores! Non dolorum saepe explicabo ipsam nostrum odit.",
      title: "Java",
      isSubscribe: false
    },
    {
      id: 2,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis maxime aperiam rerum soluta quae! Dicta aperiam magnam dolor facilis molestias voluptatum vero maiores! Non dolorum saepe explicabo ipsam nostrum odit.",
      title: "PHP",
      isSubscribe: false
    },
    {
      id: 2,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis maxime aperiam rerum soluta quae! Dicta aperiam magnam dolor facilis molestias voluptatum vero maiores! Non dolorum saepe explicabo ipsam nostrum odit.",
      title: "Javascript",
      isSubscribe: false
    }
  ];
}
