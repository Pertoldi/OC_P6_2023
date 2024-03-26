import { Component, Input } from '@angular/core';
import { IArticle } from '../../model/article.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-articles-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './articles-component.component.html',
  styleUrl: './articles-component.component.scss'
})
export class ArticlesComponentComponent {
  @Input() article!: IArticle;

  constructor(private router: Router) {
  }

  navigateToArticle(id: number): void {
    this.router.navigate(['/article', id]);
  }
}
