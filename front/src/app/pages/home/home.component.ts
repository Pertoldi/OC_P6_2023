import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MatButtonModule],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void { }

  signIn() {
    this.router.navigate(['/signin']);
  }

  signUp() {
    this.router.navigate(['/signup']);
  }
}
