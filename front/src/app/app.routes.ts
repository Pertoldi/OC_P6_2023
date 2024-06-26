import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { privateGuard } from './core/guards/private.guard';
import { ThemesListComponent } from './pages/themes-list/themes-list.component';
import { ArticleDetailsComponent } from './pages/article-details/article-details.component';
import { NewArticleComponent } from './pages/new-article/new-article.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'signin',
    component: SignInComponent
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'articles',
    component: ArticlesComponent,
    canActivate: [privateGuard]
  },
  {
    path: 'themes',
    component: ThemesListComponent,
    canActivate: [privateGuard]
  },
  {
    path: 'article/:id',
    component: ArticleDetailsComponent,
    canActivate: [privateGuard]
  },
  {
    path: 'new-article',
    component: NewArticleComponent,
    canActivate: [privateGuard]
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [privateGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
