import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MapComponent } from './containers/map/map.component';
import { ViewComponent } from './containers/view/view.component';
import { ViewerComponent } from './viewer.component';

export const VIEWER_ROUTES: Routes = [{ path: '', component: ViewerComponent }];

@NgModule({
  declarations: [ViewComponent, ViewerComponent, MapComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(VIEWER_ROUTES)],
})
export class ViewerModule {}
