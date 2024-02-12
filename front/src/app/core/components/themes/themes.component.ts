import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { ITheme } from '../../model/theme.model';
import { MatButtonModule } from '@angular/material/button';
import { SubscriptionService } from './../../services/subscription.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-themes',
  standalone: true,
  imports: [MatButtonModule, CommonModule],
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.scss'
})
export class ThemesComponent implements OnDestroy {
  @Input() theme!: ITheme;
  @Output() signalKill = new EventEmitter<boolean>();
  private subscription = new Subscription();

  constructor(
    private subscriptionService: SubscriptionService
  ) {
  }

  subscribeUnsubscribe(): void {
    if (!!this.theme.isSubscribe) {
      // const subUnsub: Subscription =
      this.subscription.add(this.subscriptionService.unsubscribe(this.theme.id).subscribe({
        next: (response: any) => {
          this.signalKill.emit(true);
        },
        error: (error) => {
          console.error('Login error:', error);
        }
      }));
      // this.subscription.add(subUnsub); // TODO refaire les subscriptions comme ici
    }
    else {
      const subSub = this.subscriptionService.subscribe(this.theme.id).subscribe();
      this.subscription.add(subSub);
      this.theme.showButton = false;
    }
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
