import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { SelectPanorama } from '../../store';
import { Panorama } from './../../models/panorama.model';

@Component({
  selector: 'app-time-slide',
  templateUrl: './time-slide.component.html',
  styleUrls: ['./time-slide.component.scss'],
})
export class TimeSlideComponent {
  @Input() count: number;
  @Input() panorama: Panorama;
  @Input() disabled = false;

  constructor(private store: Store) {}

  onSelectPanorama(id: number) {
    this.store.dispatch(new SelectPanorama(id));
  }
}
