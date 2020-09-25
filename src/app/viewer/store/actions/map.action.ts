import { PanoramaList } from './../../models/panorama.model';

export class LoadPanoramaLayer {
  static readonly type = '[Map] Load Panorama layer';
  constructor(public panoramas: PanoramaList) {}
}

export class DisplayCamera {
  static readonly type = '[Map] Display camera';
  constructor(
    public camera: { position: [number, number]; rotation: number }
  ) {}
}
