import { Component, OnInit } from '@angular/core';
import { HeaderPrivateComponent } from '../../core/components/header-private/header-private.component';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-new-article',
  standalone: true,
  imports: [HeaderPrivateComponent, MatIconModule, ReactiveFormsModule, CommonModule, MatButtonModule],
  templateUrl: './new-article.component.html',
  styleUrl: './new-article.component.scss'
})
export class NewArticleComponent implements OnInit {
  newArticleForm!: FormGroup;
  themeList = ['PHP', 'JS'];

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.newArticleForm = this.formBuilder.group({
      theme: ['', [Validators.required]],
      title: ['', [Validators.required]],
      content: ['', [Validators.required]]
    });
  }

  onSubmit() {
  }

}
