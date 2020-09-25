import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  Icon,
  IconOptions,
  LatLng,
  LatLngBoundsExpression,
  LatLngExpression,
  Layer,
} from 'leaflet';
import { DisplayCamera, LoadPanoramaLayer } from '../actions/map.action';
import { PanoramaList } from './../../models/panorama.model';

export interface MapStateOptions {
  center?: LatLngExpression;
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
  layers?: Layer[];
  maxBounds?: LatLngBoundsExpression;
}

export interface CameraLayer {
  position: LatLng;
  rotation: number;
  option: {
    icon: Icon<IconOptions>;
    rotationOrigin: string;
    opacity: number;
  };
}

export interface ViewerMap {
  options: MapStateOptions | null;
  layers: { camera: CameraLayer; points: any } | null;
}

export interface MapStateModel {
  camera: { position: [number, number]; rotation: number } | null;
  panoramas: PanoramaList | null;
}

export const mapStateDefaults: MapStateModel = {
  camera: null,
  panoramas: null,
};

@State<MapStateModel>({
  name: 'map',
  defaults: mapStateDefaults,
})
@Injectable()
export class MapState {
  constructor() {}

  @Selector()
  static getPanoramaLayer(state: MapStateModel) {
    return state.panoramas;
  }

  @Action(LoadPanoramaLayer)
  loadPanoramaLayer(
    { patchState }: StateContext<MapStateModel>,
    action: LoadPanoramaLayer
  ) {
    patchState({
      panoramas: action.panoramas,
    });
  }

  @Action(DisplayCamera)
  displayCamera(
    { patchState }: StateContext<MapStateModel>,
    action: DisplayCamera
  ) {
    patchState({
      camera: action.camera,
    });
  }
}
