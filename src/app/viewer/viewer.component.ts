import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Panorama } from './models/panorama.model';
import { PanoramasState } from './store';

@Component({
  selector: 'app-viewer',
  styleUrls: ['./viewer.component.scss'],
  template: `
    <div class="container">
      <div *ngIf="loading$ | async">
        <mat-progress-bar mode="indeterminate"></mat-progress-bar>
      </div>
      <div class="map">
        <app-map></app-map>
      </div>
      <div class="view">
        <app-view></app-view>
      </div>
      <div class="controls">
        <app-back-forward></app-back-forward>
      </div>
      <div class="infos">
        <app-panorama-infos></app-panorama-infos>
      </div>
    </div>
  `,
})
export class ViewerComponent {
  @Select(PanoramasState.getSelectedPanorama) panorama$: Observable<Panorama>;
  @Select(PanoramasState.getLoading) loading$: Observable<boolean>;
}
