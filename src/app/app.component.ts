import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Observable } from 'rxjs';
import { AppState } from './app.state';

AutoUnsubscribe();
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @Select(AppState.isDarkTheme) isDarkTheme$: Observable<boolean>;

  constructor(private overlayContainer: OverlayContainer) {}

  ngOnInit(): void {
    this.isDarkTheme$.subscribe((isDark) => {
      if (isDark) {
        this.overlayContainer.getContainerElement().classList.add('dark-theme');
      }
    });
  }

  ngOnDestroy(): void {
    // need to be here with Autounsubscribe
  }
}
