import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../shared/shared.module';
import { BackForwardComponent } from './components/back-forward/back-forward.component';
import { PanoramaInfosComponent } from './components/panorama-infos/panorama-infos.component';
import { MapComponent } from './containers/map/map.component';
import { ViewComponent } from './containers/view/view.component';
import { ViewerStates } from './store';
import { ViewerComponent } from './viewer.component';
import { TimeSlideComponent } from './components/time-slide/time-slide.component';
import { AnimationButtonComponent } from './components/animation-button/animation-button.component';

export const VIEWER_ROUTES: Routes = [{ path: '', component: ViewerComponent }];

@NgModule({
  declarations: [
    ViewComponent,
    ViewerComponent,
    MapComponent,
    BackForwardComponent,
    PanoramaInfosComponent,
    TimeSlideComponent,
    AnimationButtonComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    LeafletModule,
    RouterModule.forChild(VIEWER_ROUTES),
    NgxsModule.forFeature(ViewerStates),
  ],
})
export class ViewerModule {}
