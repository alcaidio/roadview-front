import { Component, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subject, timer } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { GoForward } from '../../store/actions/panoramas.action';
import { ToggleAnimation } from './../../store/actions/panoramas.action';

AutoUnsubscribe();
@Component({
  selector: 'app-animation-button',
  templateUrl: './animation-button.component.html',
  styleUrls: ['./animation-button.component.scss'],
})
export class AnimationButtonComponent implements OnDestroy {
  @Input() play: boolean;
  stopPlay$ = new Subject();

  constructor(private store: Store) {}

  onPlay() {
    this.store.dispatch(new ToggleAnimation());
    timer(200, 2000)
      .pipe(
        takeUntil(this.stopPlay$),
        tap((_) => this.store.dispatch(new GoForward(5)))
      )
      .subscribe();
  }

  onStop() {
    this.store.dispatch(new ToggleAnimation());
    this.stopPlay$.next();
  }

  ngOnDestroy(): void {
    this.stopPlay$.next();
  }
}
