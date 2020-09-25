import { NgModule } from '@angular/core';
import {
  canActivate,
  hasCustomClaim,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';

// TODO : add admin route (dashboard for example)
const adminOnly = () => hasCustomClaim('admin');
const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['auth/login']);
const redirectLoggedInToViewer = () => redirectLoggedInTo(['viewer']);

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'viewer',
    loadChildren: () =>
      import('./viewer/viewer.module').then((m) => m.ViewerModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    ...canActivate(redirectLoggedInToViewer),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      // preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
