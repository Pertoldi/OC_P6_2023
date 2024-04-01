import { Component, OnInit } from '@angular/core';
import { HeaderPrivateComponent } from '../../core/components/header-private/header-private.component';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { ArticlesService } from './../../core/services/articles.service';
import { Subscription } from 'rxjs';
import { SubjectsService } from '../../core/services/subjects.service';
import { ITheme } from '../../core/model/theme.model';
import { IArticle } from '../../core/model/article.model';

@Component({
  selector: 'app-new-article',
  standalone: true,
  imports: [HeaderPrivateComponent, MatIconModule, ReactiveFormsModule, CommonModule, MatButtonModule, RouterLink],
  templateUrl: './new-article.component.html',
  styleUrl: './new-article.component.scss'
})
export class NewArticleComponent implements OnInit {
  newArticleForm!: FormGroup;
  private subscription = new Subscription();


  subjects: ITheme[] = [];

  constructor(
    private articlesService: ArticlesService,
    private subjectsService: SubjectsService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.subjectsService.getAll().subscribe({
      next: (response: ITheme[]) => {
        this.subjects = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  initForm(): void {
    this.newArticleForm = this.formBuilder.group({
      subjectId: [0, [Validators.required]],
      title: ['', [Validators.required]],
      content: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    const formValue = this.newArticleForm.value;
    this.subscription.add(
      this.articlesService.create(formValue).subscribe({
        next: (response: IArticle) => {
          this.router.navigate(['/articles']);
        },
        error: (error: unknown) => {
          console.error('Login error:', error);
        }
      }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
