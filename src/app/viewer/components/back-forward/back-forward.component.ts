import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Observable } from 'rxjs';
import { GoBack, GoForward, ViewState } from '../../store';
import { radiansToDegrees } from './../../../shared/utils/angle-conversion';
import { ViewParams } from './../../models/panorama.model';

AutoUnsubscribe();
@Component({
  selector: 'app-back-forward',
  templateUrl: './back-forward.component.html',
  styleUrls: ['./back-forward.component.scss'],
})
export class BackForwardComponent implements OnInit, OnDestroy {
  @Select(ViewState.getParams) params$: Observable<ViewParams>;
  lookBack = false;

  constructor(private store: Store) {}

  ngOnInit() {
    this.params$.subscribe((params) => {
      const angle = radiansToDegrees(params.yaw);
      if (angle < 90 && angle > -90) {
        this.lookBack = false;
      } else {
        this.lookBack = true;
      }
    });
  }

  @HostListener('document:keydown.arrowup')
  onForward() {
    if (this.lookBack) {
      this.store.dispatch(new GoBack(1));
    } else {
      this.store.dispatch(new GoForward(1));
    }
  }

  @HostListener('document:keydown.arrowdown')
  onBack() {
    if (this.lookBack) {
      this.store.dispatch(new GoForward(1));
    } else {
      this.store.dispatch(new GoBack(1));
    }
  }

  @HostListener('document:keydown.shift.arrowup')
  onForwardSpeed() {
    if (this.lookBack) {
      this.store.dispatch(new GoBack(10));
    } else {
      this.store.dispatch(new GoForward(10));
    }
  }

  @HostListener('document:keydown.shift.arrowdown')
  onBackSpeed() {
    if (this.lookBack) {
      this.store.dispatch(new GoForward(10));
    } else {
      this.store.dispatch(new GoBack(10));
    }
  }

  ngOnDestroy(): void {
    // because of AutoUnsubscribe
  }
}
