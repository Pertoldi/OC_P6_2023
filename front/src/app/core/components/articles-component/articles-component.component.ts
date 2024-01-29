import { Component, Input } from '@angular/core';
import { IArticles } from './article.model';
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
  @Input() article!: IArticles;

  constructor(private router: Router) {
  }

  navigateToArticle(id: number) {
    console.log(JSON.stringify(this.article));
    // this.router.navigate(['/article/' + id]);
  }
}
