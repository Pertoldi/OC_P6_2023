import { Component } from '@angular/core';
import { ArticlesComponentComponent } from "../../core/components/articles-component/articles-component.component";
import { HeaderPrivateComponent } from '../../core/components/header-private/header-private.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-articles',
  standalone: true,
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
  imports: [ArticlesComponentComponent, CommonModule, HeaderPrivateComponent, MatButtonModule, MatIconModule]
})
export class ArticlesComponent {
  articles = [
    {
      id: 1,
      title: 'Titre',
      createdAt: new Date(),
      content: 'Content: lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled... lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scramble',
      author: {
        name: 'Toto',
      }
    },
    {
      id: 2,
      title: 'Titre 2',
      createdAt: new Date(),
      content: 'Content: lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled... lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scramble',
      author: {
        name: 'Toto',
      }
    }
  ];
}
