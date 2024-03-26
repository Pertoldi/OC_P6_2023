import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../app.config';
import { AuthService } from './auth.service';
import { SubjectsService } from './subjects.service';
import { getHeader } from './header';
import { IArticle } from '../model/article.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  apiUrl = `${API_BASE_URL}/article`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }


  create(value: { subjectId: number, title: string, content: string }): Observable<IArticle> {
    const token = this.authService.getToken();
    const headers = getHeader(token);

    return this.http.post<IArticle>(`${this.apiUrl}`, { title: value.title, content: value.content, subjectId: value.subjectId }, { headers });
  }

  getAll(): Observable<IArticle[]> {
    const token = this.authService.getToken();
    const headers = getHeader(token);

    return this.http.get<IArticle[]>(`${this.apiUrl}`, { headers });
  }

  getbyId(id: string): Observable<IArticle> {
    const token = this.authService.getToken();
    const headers = getHeader(token);

    return this.http.get<IArticle>(`${this.apiUrl}/${id}`, { headers });
  }
}
