import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderPrivateComponent } from '../../core/components/header-private/header-private.component';
import { ITheme } from '../../core/model/theme.model';
import { ThemesComponent } from '../../core/components/themes/themes.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SubjectsService } from '../../core/services/subjects.service';
import { SubscriptionService } from './../../core/services/subscription.service';

@Component({
  selector: 'app-themes-list',
  standalone: true,
  imports: [HeaderPrivateComponent, ThemesComponent, CommonModule],
  templateUrl: './themes-list.component.html',
  styleUrl: './themes-list.component.scss'
})
export class ThemesListComponent implements OnInit, OnDestroy {
  themes: ITheme[] = []

  private subscription = new Subscription();

  constructor(
    private subjectsService: SubjectsService,
    private subscriptionService: SubscriptionService
  ) {

  }

  ngOnInit(): void {
    const subjectsSubscription = this.subjectsService.getAll().subscribe({
      next: (response: any) => {
        this.themes = response;
        const subscriptionService = this.subscriptionService.getAll().subscribe({
          next: (response: any) => {
            const themeIdsubscribe = response.map((subscription: { subjectId: number; }) => subscription.subjectId);
            this.themes.forEach(theme => {
              if (themeIdsubscribe.includes(theme.id)) theme.showButton = false;
              else theme.showButton = true;
            })
          },
          error: (error: any) => {
            console.error('error is :', error);

          }
        })
        this.subscription.add(subscriptionService);
      },
      error: (error) => {
        console.error('error is :', error);
      }
    });
    this.subscription.add(subjectsSubscription);

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
