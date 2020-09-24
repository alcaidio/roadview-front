import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { User } from 'src/app/auth/model/auth.model';
import { Logout } from './../../../auth/store/auth.actions';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  // @Select(AuthState.isAuth) isAuth$: Observable<boolean>;
  @Select((state) => state.auth.user) user$: Observable<User>;
  @Select((state) => !!state.auth.user) isAuth$: Observable<string>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store
  ) {}

  onSignOut(drawer?: any) {
    this.store.dispatch(new Logout());
    if (drawer) {
      drawer.close();
    }
  }
}
