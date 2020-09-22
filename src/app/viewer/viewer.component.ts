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
    </div>
  `,
})
export class ViewerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
