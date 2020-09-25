import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { MarzipanoService } from '../../services/marzipano.service';
import { ViewParams } from './../../models/panorama.model';
import { InitializeViewer, SetViewerParams } from './../actions/view.action';

export interface ViewStateModel {
  scene?: {
    source: any;
    geometry: {
      defaultSceneLevels: { width: number }[];
    };
    view: {
      config: any;
      limiter: any;
    };
    transitionDuration: number | null;
  };
  params: ViewParams;
}

export const viewStateDefaults: ViewStateModel = {
  scene: {
    source: null,
    geometry: {
      defaultSceneLevels: [],
    },
    view: {
      config: null,
      limiter: null,
    },
    transitionDuration: null,
  },
  params: {
    yaw: 0,
    pitch: 0,
    fov: 0,
    roll: 0,
  },
};

@State<ViewStateModel>({
  name: 'view',
  defaults: viewStateDefaults,
})
@Injectable()
export class ViewState {
  constructor(private marzipanoService: MarzipanoService) {}

  @Selector()
  static getParams(state: ViewStateModel) {
    return state.params;
  }

  @Action(InitializeViewer)
  initialize(action: InitializeViewer) {
    const dom = document.querySelector(`#${action.domElementId}`);
    return this.marzipanoService.initialize(dom, {
      controls: { mouseViewMode: 'drag' },
    }); // drag|qtvr
  }

  @Action(SetViewerParams)
  setViewerParams({ patchState }: StateContext<ViewStateModel>) {
    const params = this.marzipanoService.loadParams();
    patchState({
      params,
    });
  }

  // @Action(LoadScene)
  // loadPanoramas(
  //   { getState, dispatch }: StateContext<ViewStateModel>,
  //   action: LoadScene
  // ) {
  //   if (!getState().loaded) {
  //     dispatch(new InitializeViewer(action.payload.domElementId))
  //       .toPromise()
  //       .then((viewer) => {
  //         return this.marzipanoService.loadScene(
  //           viewer,
  //           action.payload.panorama,
  //           {
  //             yaw: degreesToRadians(0),
  //             pitch: degreesToRadians(-10),
  //             fov: degreesToRadians(120),
  //           }
  //         );
  //       });
  //   }
  // }
}
