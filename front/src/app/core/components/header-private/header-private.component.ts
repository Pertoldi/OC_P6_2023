import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header-private',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './header-private.component.html',
  styleUrl: './header-private.component.scss'
})
export class HeaderPrivateComponent {

  active = '';

  setActive(label: string) {
    this.active = label;
  }

}
