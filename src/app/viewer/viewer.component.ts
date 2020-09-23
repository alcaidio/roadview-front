import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Panorama } from './models/panorama.model';
import { ViewerService } from './services/viewer.service';

@Component({
  selector: 'app-viewer',
  styleUrls: ['./viewer.component.scss'],
  template: `
    <div class="container">
      <div class="map">
        <app-map></app-map>
        <div class="no" *ngIf="!(panorama$ | async)">
          <mat-icon class="fleche">arrow_upward</mat-icon>Sélectionnez une image
          en cliquant sur un point de la carte 🤓
        </div>
      </div>
      <div class="view">
        <app-view></app-view>
      </div>
      <!-- <div class="controls">
        <app-back-forward></app-back-forward>
      </div> -->
      <div class="infos">
        <app-panorama-infos></app-panorama-infos>
      </div>
    </div>
  `,
})
export class ViewerComponent implements OnInit {
  panorama$: Observable<Panorama>;
  constructor(private viewerService: ViewerService) {}

  ngOnInit(): void {
    this.panorama$ = this.viewerService.getPanorama();
  }
}
