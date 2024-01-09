import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-public',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './header-public.component.html',
  styleUrl: './header-public.component.scss'
})
export class HeaderPublicComponent {

  constructor(private router: Router) { }

  goToHomePage() {
    this.router.navigate(['']);
  }
}
