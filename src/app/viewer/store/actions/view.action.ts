import { Panorama } from './../../models/panorama.model';

export class InitializeViewer {
  static readonly type = '[Viewer] Initialize marzipano viewer';
  constructor(public domElementId: string) {}
}

export class LoadScene {
  static readonly type = '[Viewer] Load Scene';
  constructor(
    public payload: {
      domElementId: string;
      panorama: Panorama;
      viewConfig?: any;
    }
  ) {}
}

export class SetViewerParams {
  static readonly type = '[Viewer] Set Viewer params';
}
