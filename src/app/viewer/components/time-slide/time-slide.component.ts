import { Panorama } from './../../models/panorama.model';
import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { SelectPanorama } from '../../store';

@Component({
  selector: 'app-time-slide',
  templateUrl: './time-slide.component.html',
  styleUrls: ['./time-slide.component.scss'],
})
export class TimeSlideComponent {
  @Input() count: number;
  @Input() panorama: Panorama;

  constructor(private store: Store) {}

  onSelectPanorama(nbr: number) {
    this.store.dispatch(new SelectPanorama(nbr));
  }
}
