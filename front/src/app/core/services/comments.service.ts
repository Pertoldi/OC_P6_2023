import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../app.config';
import { getHeader } from './header';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { IArticle } from '../model/article.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  apiUrl = `${API_BASE_URL}/comment`;

  constructor(
    private http: HttpClient,
    private authService: AuthService,

  ) { }

  create(comment: { content: string, themeId: number }): Observable<IArticle> {
    const token = this.authService.getToken();
    const headers = getHeader(token);

    return this.http.post<IArticle>(`${this.apiUrl}`, comment, { headers });
  }
}
