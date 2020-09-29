import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subject, timer } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { GoForward } from '../../store/actions/panoramas.action';

AutoUnsubscribe();
@Component({
  selector: 'app-animation-button',
  templateUrl: './animation-button.component.html',
  styleUrls: ['./animation-button.component.scss'],
})
export class AnimationButtonComponent implements OnDestroy {
  play = false;
  stopPlay$ = new Subject();

  constructor(private store: Store, private router: Router) {}

  onClick() {
    this.play = !this.play;

    if (this.play) {
      timer(200, 2000)
        .pipe(
          takeUntil(this.stopPlay$),
          tap((_) => this.store.dispatch(new GoForward(5)))
        )
        .subscribe();
    } else {
      this.stopPlay$.next();
    }
  }

  ngOnDestroy(): void {
    this.stopPlay$.next();
  }
}
