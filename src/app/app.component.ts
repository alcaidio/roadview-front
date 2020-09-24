import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from './app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @Select(AppState.isDarkTheme) isDarkTheme$: Observable<boolean>;
  sub = new Subscription();

  constructor(private overlayContainer: OverlayContainer) {}

  ngOnInit(): void {
    this.sub = this.isDarkTheme$.subscribe((isDark) => {
      if (isDark) {
        this.overlayContainer.getContainerElement().classList.add('dark-theme');
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
