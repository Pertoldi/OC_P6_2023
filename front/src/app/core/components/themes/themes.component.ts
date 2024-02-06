import { Component, Input } from '@angular/core';
import { ITheme } from '../../model/theme.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-themes',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.scss'
})
export class ThemesComponent {
  @Input() theme!: ITheme;

  constructor(
    // private 
  ) { }

  subscribe() {

  }

}
