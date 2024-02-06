import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-private',
  standalone: true,
  imports: [MatIconModule, RouterLink, CommonModule],
  templateUrl: './header-private.component.html',
  styleUrl: './header-private.component.scss'
})
export class HeaderPrivateComponent {

  active = ''

  constructor(private router: Router) {
    this.active = this.router.url.split('/').join('');
  }

  test() {
    console.log('TEST')
  }
}
