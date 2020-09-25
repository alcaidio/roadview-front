import { ID } from './../../../shared/models/id.model';
import { PanoramaList } from './../../models/panorama.model';

export class LoadPanoramas {
  static readonly type = '[Panoramas] Load';
}

export class LoadPanoramasSuccess {
  static readonly type = '[Panoramas] Load Success';
  constructor(public panoramas: PanoramaList) {}
}

export class LoadPanoramasFailed {
  static readonly type = '[Panoramas] Load Failed';
  constructor(public error: any) {}
}

export class SelectPanorama {
  static readonly type = '[Panoramas] Select panorama';
  constructor(public id: ID) {}
}

export class GoForward {
  static readonly type = '[Panoramas] Go Forward';
  constructor(public speed: number) {}
}

export class GoBack {
  static readonly type = '[Panoramas] Go Back';
  constructor(public speed: number) {}
}
