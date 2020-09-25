import { Component, HostListener } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GoBack, GoForward, PanoramasState } from '../../store';
import { Panorama } from './../../models/panorama.model';

@Component({
  selector: 'app-back-forward',
  templateUrl: './back-forward.component.html',
  styleUrls: ['./back-forward.component.scss'],
})
export class BackForwardComponent {
  @Select(PanoramasState.getSelectedPanorama) panorama$: Observable<Panorama>;
  constructor(private store: Store) {}

  @HostListener('document:keydown.arrowup')
  onForward() {
    this.store.dispatch(new GoForward(1));
  }

  @HostListener('document:keydown.arrowdown')
  onBack() {
    this.store.dispatch(new GoBack(1));
  }

  @HostListener('document:keydown.shift.arrowup')
  onForwardSpeed() {
    this.store.dispatch(new GoForward(10));
  }

  @HostListener('document:keydown.shift.arrowdown')
  onBackSpeed() {
    this.store.dispatch(new GoBack(10));
  }
}
