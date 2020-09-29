import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { catchError, map } from 'rxjs/operators';
import { ID } from 'src/app/shared/models/id.model';
import { SnackService } from 'src/app/shared/services/snack.service';
import { LoadPanoramaLayer } from '../actions/map.action';
import { Panorama, PanoramaList } from './../../models/panorama.model';
import { PanoramaService } from './../../services/panorama.service';
import {
  GoBack,
  GoForward,
  LoadPanoramas,
  LoadPanoramasFailed,
  LoadPanoramasSuccess,
  SelectPanorama,
  ToggleAnimation,
} from './../actions/panoramas.action';

export const arrayToObject = (entities) => {
  return entities.reduce((obj, panorama: Panorama) => {
    return { ...obj, [panorama.id]: panorama };
  }, {});
};

export interface PanoramasStateModel {
  ids: ID[];
  entities: {
    [id: string]: Panorama;
  };
  selectedPanoramaId: ID | null;
  animation: boolean;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export const panoramasStateDefaults: PanoramasStateModel = {
  ids: [],
  entities: {},
  selectedPanoramaId: 1,
  animation: false,
  loading: false,
  loaded: false,
  error: '',
};

@State<PanoramasStateModel>({
  name: 'panoramas',
  defaults: panoramasStateDefaults,
})
@Injectable()
export class PanoramasState implements NgxsOnInit {
  constructor(
    private panoramaService: PanoramaService,
    private snack: SnackService
  ) {}

  @Selector()
  static getEntities(state: PanoramasStateModel) {
    return state.entities;
  }

  @Selector()
  static getPanoramasCount(state: PanoramasStateModel) {
    return state.ids.length;
  }

  @Selector()
  static getSelectedId(state: PanoramasStateModel) {
    return state.selectedPanoramaId;
  }

  @Selector()
  static getSelectedPanorama(state: PanoramasStateModel) {
    return state.selectedPanoramaId && state.entities[state.selectedPanoramaId];
  }

  @Selector()
  static getLoading(state: PanoramasStateModel) {
    return state.loading;
  }

  @Selector()
  static getIsAnimate(state: PanoramasStateModel) {
    return state.animation;
  }

  ngxsOnInit(ctx: StateContext<PanoramasStateModel>) {
    ctx.dispatch(new LoadPanoramas());
  }

  @Action(LoadPanoramas)
  loadPanoramas({
    getState,
    dispatch,
    patchState,
  }: StateContext<PanoramasStateModel>) {
    if (!getState().loaded) {
      patchState({
        loading: true,
      });
      return this.panoramaService.getAllPanoramas().pipe(
        map((pl: PanoramaList) => dispatch(new LoadPanoramasSuccess(pl))),
        catchError((err: any) => dispatch(new LoadPanoramasFailed(err)))
      );
    }
  }

  @Action(LoadPanoramasSuccess)
  loadSuccess(
    { getState, patchState, dispatch }: StateContext<PanoramasStateModel>,
    action: LoadPanoramasSuccess
  ) {
    const list = action.panoramas;
    dispatch(new LoadPanoramaLayer(list));
    list.features.map((panorama: Panorama) => {
      const state = getState();
      patchState({
        ids: [...state.ids, panorama.id],
        entities: { ...state.entities, [panorama.id]: panorama },
        loading: false,
        loaded: true,
      });
    });
  }

  @Action(LoadPanoramasFailed)
  loadFailure(
    { patchState }: StateContext<PanoramasStateModel>,
    action: LoadPanoramasFailed
  ) {
    patchState({
      error: action.error,
      loading: false,
      loaded: false,
    });
  }

  @Action(SelectPanorama)
  select(
    { patchState }: StateContext<PanoramasStateModel>,
    action: SelectPanorama
  ) {
    patchState({ selectedPanoramaId: action.id });
  }

  @Action(GoForward)
  goForward(
    { patchState, getState }: StateContext<PanoramasStateModel>,
    action: GoForward
  ) {
    const id = +getState().selectedPanoramaId;
    const count = getState().ids.length;
    patchState({ selectedPanoramaId: (id + 1 * action.speed) % count });
  }

  @Action(GoBack)
  goBack(
    { patchState, getState }: StateContext<PanoramasStateModel>,
    action: GoForward
  ) {
    let id = +getState().selectedPanoramaId;
    const count = getState().ids.length;
    if (id === 1) {
      id = count + 1;
    }
    patchState({ selectedPanoramaId: id - ((1 * action.speed) % count) });
  }

  @Action(ToggleAnimation)
  toggleAnimation({ patchState, getState }: StateContext<PanoramasStateModel>) {
    const animation = getState().animation;
    patchState({
      animation: !animation,
    });
    if (!animation) {
      this.snack.notification('Navigation automatique lancée ! 🚀', 'X', 4000);
    } else {
      this.snack.notification(
        'Navigation automatique interrompu. 👀',
        'X',
        4000
      );
    }
  }
}
