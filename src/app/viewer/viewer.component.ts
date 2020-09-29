import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Observable } from 'rxjs';
import { Panorama, ViewParams } from './models/panorama.model';
import { PanoramasState, ViewState } from './store';

@AutoUnsubscribe()
@Component({
  selector: 'app-viewer',
  styleUrls: ['./viewer.component.scss'],
  template: `
    <div class="container">
      <div *ngIf="loading$ | async">
        <mat-progress-bar
          mode="indeterminate"
          color="accent"
        ></mat-progress-bar>
      </div>
      <div class="map">
        <app-map></app-map>
      </div>
      <div class="view">
        <app-view></app-view>
      </div>
      <ng-container *ngIf="panorama$ | async as panorama">
        <div class="controls">
          <app-animation-button
            [play]="isAnimate$ | async"
          ></app-animation-button>
          <app-back-forward
            [params]="params$ | async"
            [disabled]="isAnimate$ | async"
          ></app-back-forward>
        </div>
        <div class="slide" *ngIf="isBig">
          <app-time-slide
            [count]="count$ | async"
            [panorama]="panorama"
            [disabled]="isAnimate$ | async"
          ></app-time-slide>
        </div>
        <div class="infos">
          <app-panorama-infos [panorama]="panorama"></app-panorama-infos>
        </div>
      </ng-container>
    </div>
  `,
})
export class ViewerComponent implements OnInit, OnDestroy {
  @Select(PanoramasState.getSelectedPanorama) panorama$: Observable<Panorama>;
  @Select(PanoramasState.getLoading) loading$: Observable<boolean>;
  @Select(PanoramasState.getPanoramasCount) count$: Observable<number>;
  @Select(PanoramasState.getIsAnimate) isAnimate$: Observable<boolean>;
  @Select(ViewState.getParams) params$: Observable<ViewParams>;

  isBig: boolean;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakpointObserver
      .observe([
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isBig = true;
        } else {
          this.isBig = false;
        }
      });
  }

  ngOnDestroy(): void {
    // don't remove because of Autounsubscribe
  }
}
