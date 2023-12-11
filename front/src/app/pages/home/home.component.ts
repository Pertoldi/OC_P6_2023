import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MatButtonModule]
})
export class HomeComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }

  start() {
    alert('Commencez par lire le README et à vous de jouer !');
  }
}
