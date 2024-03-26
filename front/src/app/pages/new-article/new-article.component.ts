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


  subjects: any[] = [];

  // TODO typer tous les any
  // TODO Ajouter tous les retour de fonctions
  // private Integer id;
  // private String name;
  // private String description;
  // private LocalDateTime created_at;
  // private LocalDateTime updated_at;
  constructor(
    private articlesService: ArticlesService,
    private subjectsService: SubjectsService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.subjectsService.getAll().subscribe({
      next: (response: any) => {
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
    const registerSubscription = this.articlesService.create(formValue).subscribe({
      next: (response: any) => {
        this.router.navigate(['/articles']);
      },
      error: (error: any) => {
        console.error('Login error:', error);
      }
    });
    this.subscription.add(registerSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
