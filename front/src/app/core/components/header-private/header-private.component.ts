import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-private',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './header-private.component.html',
  styleUrl: './header-private.component.scss'
})
export class HeaderPrivateComponent {

  active = this.router.url.split('/')[0];

  constructor(private router: Router) {

    console.log('active is :', this.active)
  }

  setActive(label: string) {
  }

}
