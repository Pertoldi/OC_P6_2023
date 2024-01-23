import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { privateGuard } from './core/guards/private.guard';
import { ThemesListComponent } from './pages/themes-list/themes-list.component';

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
    canActivate: [privateGuard]
  },
  {
    path: 'articles',
    component: ArticlesComponent,
    // canActivate: [privateGuard]
  },
  {
    path: 'themes',
    component: ThemesListComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }
];
