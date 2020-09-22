import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {
  degreesToRadians,
  radiansToDegrees,
} from 'src/app/shared/utils/angle-conversion';
import { createLogo } from 'src/app/shared/utils/hotspot';
import { Hotspot, Panorama } from '../../models/panorama.model';
import { MarzipanoService } from '../../services/marzipano.service';
import { PanoramaService } from '../../services/panorama.service';
import { ViewerService } from '../../services/viewer.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit, OnDestroy {
  panorama: Panorama;
  subs: Subscription;
  viewer: any;
  scene: any;

  // An hotspot list, for the example
  hotspots$: Observable<Hotspot[]>;

  constructor(
    private marzipano: MarzipanoService,
    private viewService: ViewerService,
    private panoramaService: PanoramaService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    // initialise the view
    this.viewer = this.marzipano.initialize(document.querySelector('#viewer'));

    // subscribe to the panorama, when user click on a point on the map a panorama is submitted with loadFeature()
    this.subs = this.viewService.getPanorama().subscribe((panorama) => {
      if (panorama) {
        this.scene = this.loadScene(panorama);
        this.panoramaService.getOnePanorama(panorama.id);
        this.addHotspotLogo();
      }
    });
    // track if the viewer view change
    this.elementRef.nativeElement
      .querySelector('#viewer')
      .addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  private loadScene(panorama: Panorama) {
    return this.marzipano.loadScene(this.viewer, panorama.properties.image, {
      yaw: degreesToRadians(0),
      pitch: degreesToRadians(-10),
      fov: degreesToRadians(120),
    });
  }

  private addHotspotLogo() {
    this.scene
      .hotspotContainer()
      .createHotspot(createLogo(), { yaw: 45, pitch: 45 });
  }

  // get the scene yaw and send it to the map to update the rotation's camera icon
  onMouseMove() {
    const params = this.scene._view._params;
    const yaw = radiansToDegrees(params.yaw);
    this.viewService.loadRotation(yaw);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
