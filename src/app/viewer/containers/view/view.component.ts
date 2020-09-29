import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Observable, Subscription } from 'rxjs';
import { Hotspot, Panorama } from '../../models/panorama.model';
import { MarzipanoService } from '../../services/marzipano.service';
import {
  PanoramasState,
  SelectPanorama,
  SetViewerParams,
  ViewState,
} from '../../store';
import { ID } from './../../../shared/models/id.model';
import { debounce } from './../../../shared/utils/event-listener';
import { ViewParams } from './../../models/panorama.model';

@AutoUnsubscribe()
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit, OnDestroy {
  @Select(PanoramasState.getSelectedPanorama) panorama$: Observable<Panorama>;
  @Select(ViewState.getParams) params$: Observable<ViewParams>;
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

    this.panorama$.subscribe((panorama) => {
      if (panorama) {
        this.scene = this.loadScene(panorama);
        // track if the viewer view change
        this.elementRef.nativeElement
          .querySelector('#viewer')
          .addEventListener(
            'mousemove',
            debounce(this.onMouseMove.bind(this), 100)
          );
      }
    });
  }

  // get the scene yaw and send it to the map to update the rotation's camera icon
  onMouseMove() {
    this.store.dispatch(new SetViewerParams());
  }

  private loadScene(panorama: Panorama) {
    let viewConfig: ViewParams;
    this.params$.subscribe((params) => {
      viewConfig = {
        yaw: params.yaw,
        pitch: params.pitch,
        fov: 120,
      };
    });
    return this.marzipano.loadScene(
      this.viewer,
      panorama.properties.image,
      viewConfig
    );
  }

  // This method must be present, even if empty.
  ngOnDestroy(): void {
    // We'll throw an error if it doesn't
  }
}
