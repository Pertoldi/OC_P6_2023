import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { ITheme } from '../../model/theme.model';
import { MatButtonModule } from '@angular/material/button';
import { SubscriptionService } from './../../services/subscription.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-themes',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.scss'
})
export class ThemesComponent implements OnDestroy {
  @Input() theme!: ITheme;
  @Output() signalKill = new EventEmitter<boolean>();
  private subscription = new Subscription();

  constructor(
    private subscriptionService: SubscriptionService
  ) { }

  subscribeUnsubscribe() {
    if (!!this.theme.isSubscribe) {
      const subUnsub = this.subscriptionService.unsubscribe(this.theme.id).subscribe();
      this.subscription.add(subUnsub);
      this.signalKill.emit(true)
    }
    else {
      const subSub = this.subscriptionService.subscribe(this.theme.id).subscribe()
      this.subscription.add(subSub);
    }
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
