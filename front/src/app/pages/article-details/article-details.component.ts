import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HeaderPrivateComponent } from '../../core/components/header-private/header-private.component';
import { IArticles } from '../../core/components/articles-component/article.model';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [MatIconModule, HeaderPrivateComponent, CommonModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.scss'
})
export class ArticleDetailsComponent {
  article: IArticles = {
    title: 'TEST',
    content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est quo explicabo natus deserunt soluta sint voluptatum eveniet omnis quam, molestias repellendus. Velit, placeat. Doloremque veritatis animi laudantium a quibusdam porro!',
    id: 1,
    createdAt: new Date(),
    author: {
      name: 'TOTO'
    },
    comments: [
      {
        id: 1,
        content: "contenu du commentaire",
        author: {
          id: 1,
          name: "test TEST",
          email: "test3@test.com",
        },
      }, {
        id: 1,
        content: "contenu du commentaire",
        author: {
          id: 1,
          name: "test TEST",
          email: "test3@test.com",
        },
      },
    ]
  }

  theme = 'PHP'

  commentForm!: FormGroup;

  onSubmit() {
    const formValue = this.commentForm.value;
    console.log('formValue is :', formValue)

  }
}
