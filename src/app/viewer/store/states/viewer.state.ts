import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import { MapState } from './map.state';
import { PanoramasState } from './panoramas.state';
import { ViewState } from './view.state';

@State({
  name: 'viewer',
  children: [MapState, ViewState, PanoramasState],
})
@Injectable()
export class ViewerState {}
