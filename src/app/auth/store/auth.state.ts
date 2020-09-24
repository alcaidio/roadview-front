import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Navigate } from '@ngxs/router-plugin';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import * as firebase from 'firebase/app';
import { SnackService } from 'src/app/shared/services/snack.service';
import { AuthStateModel } from './../model/auth.model';
import {
  LoginFailed,
  LoginSuccess,
  LoginWithEmailAndPassword,
  LoginWithGoogle,
  Logout,
  LogoutSuccess,
} from './auth.actions';

const defaultAuthState: AuthStateModel = {
  user: null,
  loading: false,
  error: null,
};

// NOTE : attention redirection possible via guards de fireauth dans app-routing.module.ts

@State<AuthStateModel>({
  name: 'auth',
  defaults: defaultAuthState,
})
@Injectable()
export class AuthState {
  constructor(private afAuth: AngularFireAuth, private snack: SnackService) {}

  @Selector()
  static isAuth(state: AuthStateModel) {
    return !!state.user;
  }

  @Selector()
  static getUser(state: AuthStateModel) {
    return state.user;
  }

  @Selector()
  static getEmail(state: AuthStateModel) {
    return state.user.email;
  }

  @Selector()
  static getLoading(state: AuthStateModel) {
    return state.loading;
  }

  @Selector()
  static getError(state: AuthStateModel) {
    return state.error.message;
  }

  @Action(LoginWithGoogle)
  loginWithGoogle(ctx: StateContext<AuthStateModel>) {
    const provider = new firebase.auth.GoogleAuthProvider();
    ctx.setState({
      loading: true,
    });
    return this.afAuth
      .signInWithPopup(provider)
      .then((response: { user: any }) => {
        ctx.dispatch(new LoginSuccess(response.user.user));
      })
      .catch((error) => {
        ctx.dispatch(new LoginFailed(error));
      });
  }

  @Action(LoginWithEmailAndPassword)
  loginWithEmailAndPassword(
    ctx: StateContext<AuthStateModel>,
    action: LoginWithEmailAndPassword
  ) {
    ctx.setState({
      loading: true,
    });
    return this.afAuth
      .signInWithEmailAndPassword(action.email, action.password)
      .then((user: any) => {
        const { uid, email, displayName, phoneNumber, photoURL } = user.user;
        ctx.dispatch(
          new LoginSuccess({ uid, email, displayName, phoneNumber, photoURL })
        );
      })
      .catch((error) => {
        ctx.dispatch(new LoginFailed(error));
      });
  }

  @Action(LoginSuccess)
  setUserStateOnSuccess(
    ctx: StateContext<AuthStateModel>,
    event: LoginSuccess
  ) {
    ctx.setState({
      user: event.user,
      loading: false,
    });
    ctx.dispatch(new Navigate(['/viewer']));
    this.snack.connected();
  }

  @Action(LoginFailed)
  loginFailed(ctx: StateContext<AuthStateModel>, event: LoginFailed) {
    ctx.setState({
      error: event.error,
      loading: false,
    });
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    return this.afAuth.signOut().then(() => {
      ctx.dispatch(new LogoutSuccess());
    });
  }

  @Action(LogoutSuccess)
  logoutSuccess(ctx: StateContext<AuthStateModel>) {
    ctx.setState(defaultAuthState);
    ctx.dispatch(new Navigate(['/home']));
    this.snack.disconnected();
  }
}
