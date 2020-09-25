import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { degreesToRadians } from 'src/app/shared/utils/angle-conversion';
import { Hotspot, Panorama } from '../../models/panorama.model';
import { MarzipanoService } from '../../services/marzipano.service';
import { PanoramasState, SelectPanorama, SetViewerParams } from '../../store';
import { ID } from './../../../shared/models/id.model';
import { debounce } from './../../../shared/utils/event-listener';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit, OnDestroy {
  @Select(PanoramasState.getSelectedPanorama) panorama$: Observable<Panorama>;
  @Select(PanoramasState.getSelectedId) id$: Observable<ID>;
  subs: Subscription;
  viewer: any;
  scene: any;

  // An hotspot list, for the example
  hotspots$: Observable<Hotspot[]>;

  constructor(
    private marzipano: MarzipanoService,
    private elementRef: ElementRef,
    private store: Store
  ) {}

  ngOnInit() {
    this.viewer = this.marzipano.initialize(document.querySelector('#viewer'));
    this.id$.subscribe((id) => {
      this.store.dispatch(new SelectPanorama(id));
    });

    this.subs = this.panorama$.subscribe((panorama) => {
      if (panorama) {
        this.scene = this.loadScene(panorama);
        // track if the viewer view change
        this.elementRef.nativeElement
          .querySelector('#viewer')
          .addEventListener(
            'mousemove',
            debounce(this.onMouseMove.bind(this), 120)
          );
      }
    });
  }

  // get the scene yaw and send it to the map to update the rotation's camera icon
  onMouseMove() {
    this.store.dispatch(new SetViewerParams());
  }

  private loadScene(panorama: Panorama) {
    return this.marzipano.loadScene(this.viewer, panorama.properties.image, {
      yaw: degreesToRadians(0),
      pitch: degreesToRadians(-10),
      fov: degreesToRadians(120),
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
