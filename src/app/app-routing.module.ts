import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/viewer', pathMatch: 'full' },
  {
    path: 'viewer',
    // canActivate:[AuthenticatedGuard],
    loadChildren: () =>
      import('./viewer/viewer.module').then((m) => m.ViewerModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
