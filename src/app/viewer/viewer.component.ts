import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewer',
  styleUrls: ['./viewer.component.scss'],
  template: `
    <div class="container">
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
export class ViewerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
