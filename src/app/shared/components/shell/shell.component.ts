import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
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

  @Select((state) => state.user.user.email) email$: Observable<string>;

  constructor(
    public afAuth: AngularFireAuth,
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
