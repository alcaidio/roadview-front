import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

export type Theme = 'dark' | 'light';

export interface AppStateModel {
  theme: Theme;
}

export class SetDarkTheme {
  static type = '[App] Set theme to dark';
}
export class SetLightTheme {
  static type = '[App] Set theme to light';
}
export class ToggleTheme {
  static type = '[App] Toggle theme';
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    theme: 'dark',
  },
})
@Injectable()
export class AppState {
  @Selector()
  static getTheme(state: AppStateModel) {
    return state.theme;
  }

  @Selector()
  static isDarkTheme(state: AppStateModel) {
    return state.theme === 'dark';
  }

  @Action(SetDarkTheme)
  setDarkTheme(ctx: StateContext<AppStateModel>) {
    ctx.setState({
      theme: 'dark',
    });
  }

  @Action(SetLightTheme)
  setLightTheme(ctx: StateContext<AppStateModel>) {
    ctx.setState({
      theme: 'light',
    });
  }

  @Action(ToggleTheme)
  toggleTheme(ctx: StateContext<AppStateModel>) {
    const theme = ctx.getState().theme === 'light' ? 'dark' : 'light';
    ctx.setState({
      theme,
    });
  }
}
