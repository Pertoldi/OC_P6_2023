import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HeaderPrivateComponent } from '../../core/components/header-private/header-private.component';
import { IArticles } from '../../core/components/articles-component/article.model';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommentsService } from './../../core/services/comments.service';
import { ArticlesService } from './../../core/services/articles.service';

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [MatIconModule, HeaderPrivateComponent, CommonModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.scss'
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {
  id: string = "";
  private subscription = new Subscription();

  theme = 'PHP'

  article: any | undefined

  commentForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private commentsService: CommentsService,
    private articlesService: ArticlesService,
    private formBuilder: FormBuilder,
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;

    this.subscription.add(this.articlesService.getbyId(this.id).subscribe({
      next: (response: any) => {
        this.article = response
        console.log('response is :', response)
      },
      error: (error) => {
        console.error('Login error:', error);
      }
    })
    )
  }

  initForm(): void {
    this.commentForm = this.formBuilder.group({
      content: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    const formValue = this.commentForm.value;
    formValue.articleId = this.id;
    this.subscription.add(this.commentsService.create(formValue).subscribe({
      next: (response) => {
        this.article.comments.push(response); // TODO check le service ici et ajouter la redirection sur la flêche
      },
      error: (error) => {
        console.error('Login error:', error); // TODO
      }
    }))

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

