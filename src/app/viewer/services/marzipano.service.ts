import { Injectable } from '@angular/core';
import * as Marzipano from 'marzipano';
import { Hotspot } from '../models/panorama.model';
import {
  degreesToRadians,
  radiansToDegrees,
} from './../../shared/utils/angle-conversion';
import { createHotspot } from './../../shared/utils/hotspot';

@Injectable({
  providedIn: 'root',
})
export class MarzipanoService {
  viewer: any;
  view: any;
  defaultViewerOptions = {
    controls: {
      mouseViewMode: 'drag', // drag|qtvr
    },
  };
  defaultSceneLevels = [{ width: 1024 }, { width: 2048 }, { width: 4096 }];
  limiter = Marzipano.RectilinearView.limit.vfov(
    degreesToRadians(25),
    degreesToRadians(105)
  );

  constructor() {}

  initialize(domElement: Element, options = this.defaultViewerOptions) {
    return new Marzipano.Viewer(domElement, options);
  }

  loadScene(viewer: Marzipano.Viewer, image: string, viewConfig: any) {
    const geometry = new Marzipano.EquirectGeometry(this.defaultSceneLevels);
    const source = Marzipano.ImageUrlSource.fromString(image);
    this.view = new Marzipano.RectilinearView(viewConfig, this.limiter);
    const scene = viewer.createScene({
      source,
      geometry,
      view: this.view,
    });

    // TODO : keep the config of the last view
    // view.setYaw(degreesToRadians(yaw));
    // view.setPitch(degreesToRadians(pitch));
    // view.setFov(degreesToRadians(fov));

    scene.switchTo({
      transitionDuration: 2500,
    });

    return scene;
  }

  loadParams() {
    return this.view.parameters();
  }

  /*
    Create hotspot element that will be placed in the hotspot container
  */
  addHotspot(scene: any, hotspot: Hotspot) {
    const { panoId, distance, direction } = hotspot;

    // Calculation of the rotation angle for the perspective effect
    const minDistance = 5;
    const maxDistance = 20;
    const cameraHeight = 2;
    const pitch = Math.atan(cameraHeight / distance);
    const offset = 5 / (maxDistance - minDistance + 1) + 1;
    const angle = 90 - radiansToDegrees(pitch) - offset;

    // Create the button hotspot
    const hotspotElement = createHotspot(angle, distance);

    // Add onClick event to hotspot
    hotspotElement.addEventListener('click', () => {
      // TODO : add real link
      console.log('load image of hotspot n: ', panoId);
    });

    const position = {
      yaw: degreesToRadians(direction),
      pitch,
    };
    return scene.hotspotContainer().createHotspot(hotspotElement, position);
  }
}
