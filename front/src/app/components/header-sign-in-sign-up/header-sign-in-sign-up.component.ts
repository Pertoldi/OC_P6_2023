import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-sign-in-sign-up',
  templateUrl: './header-sign-in-sign-up.component.html',
  styleUrls: ['./header-sign-in-sign-up.component.scss']
})
export class HeaderSignInSignUpComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goHome() {
    this.router.navigate(['/']);
  }

}
