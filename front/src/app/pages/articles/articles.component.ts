import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticlesComponentComponent } from "../../core/components/articles-component/articles-component.component";
import { HeaderPrivateComponent } from '../../core/components/header-private/header-private.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticlesService } from '../../core/services/articles.service';
import { IArticles } from '../../core/model/articles.model';

@Component({
  selector: 'app-articles',
  standalone: true,
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
  imports: [ArticlesComponentComponent, CommonModule, HeaderPrivateComponent, MatButtonModule, MatIconModule, RouterLink]
})

export class ArticlesComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();


  constructor(
    private articlesService: ArticlesService
  ) {

  }

  articles: any[] = [];

  ngOnInit(): void {
    const articlesSubscription = this.articlesService.getAll().subscribe({
      next: (response: any) => {
        this.articles = response;
      },
      error: (error) => {
      }
    });
    this.subscription.add(articlesSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
