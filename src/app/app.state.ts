import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';

export type Theme = 'dark' | 'light';

export interface AppStateModel {
  theme: Theme;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    theme: 'light',
  },
})
@Injectable()
export class AppState {}
