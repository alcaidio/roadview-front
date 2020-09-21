import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './containers/map/map.component';
import { ViewerComponent } from './containers/viewer/viewer.component';

@NgModule({
  declarations: [AppComponent, MapComponent, ViewerComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, LeafletModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
