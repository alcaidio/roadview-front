import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  divIcon,
  geoJSON,
  icon,
  latLng,
  Map,
  marker,
  markerClusterGroup,
  tileLayer,
} from 'leaflet';
import 'leaflet-rotatedmarker';
import 'leaflet.markercluster';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PanoramaList } from '../../models/panorama.model';
import {
  DisplayCamera,
  MapState,
  PanoramasState,
  SelectPanorama,
  ViewState,
} from '../../store';
import { radiansToDegrees } from './../../../shared/utils/angle-conversion';
import { Panorama, ViewParams } from './../../models/panorama.model';

@AutoUnsubscribe()
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  @Select(MapState.getPanoramaLayer) panoramas$: Observable<PanoramaList>;
  @Select(PanoramasState.getSelectedPanorama) panorama$: Observable<Panorama>;
  @Select(ViewState.getParams) params$: Observable<ViewParams>;
  @Select(PanoramasState.getLoading) loading$: Observable<boolean>;

  map: Map;
  token = environment.mapbox.token;
  options: any;
  start = false;

  base = tileLayer(
    `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${this.token}`,
    {
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: this.token,
      maxZoom: 22,
    }
  );

  constructor(private store: Store) {}

  ngOnInit(): void {
    // this.panoramas$ = this.panoramaService.getAllPanoramas();
    // add base layer to the map (option in html)
    this.options = {
      layers: [this.base],
      zoom: 16,
      center: latLng(48.53114444443002, 7.689522222222226),
      zoomControl: false,
    };
  }

  onMapReady(map: L.Map) {
    let camera: any;
    let cameraOptions: any;

    cameraOptions = {
      icon: icon({
        iconUrl: 'assets/img/camera.svg',
        iconSize: [60, 60],
        className: 'camera',
      }),
      rotationOrigin: 'center center',
    };

    const createPoint = (feature, latlng) => {
      return marker(latlng, {
        icon: icon({
          iconUrl: 'assets/img/point.svg',
          iconSize: [10, 10],
          className: 'point',
        }),
      });
    };

    // create the camera icon for the map view
    this.panorama$.subscribe((panorama: Panorama) => {
      const position = panorama.geometry.coordinates;
      const rotation = panorama.properties.direction;
      this.store.dispatch(
        new DisplayCamera({
          position,
          rotation,
        })
      );
      if (camera !== undefined) {
        map.removeLayer(camera);
      }

      camera = marker([position[1], position[0]], cameraOptions);
      camera.setRotationAngle(panorama.properties.direction);
      this.params$.subscribe((params: ViewParams) => {
        const rot =
          panorama.properties.direction + radiansToDegrees(params.yaw);
        camera.setRotationAngle(rot);
      });

      camera.addTo(map);
      map.panTo({ lat: position[1], lng: position[0] });
    });

    // zoom to the feature and add camera icon on the map, load the new panorama in the viewer
    const zoomToFeature = (e: any, layer) => {
      this.store.dispatch(new SelectPanorama(e.sourceTarget.feature.id));

      if (map.getZoom() < 20) {
        map.flyTo(e.latlng, 20);
      } else {
        map.flyTo(e.latlng, map.getZoom());
      }

      if (!this.start) {
        this.start = true;
      }
    };

    // add an event listener
    const onFeature = (feature, layer) => {
      layer.on('click', zoomToFeature);
    };

    // get the data to create points
    this.panoramas$.subscribe((panoramas: PanoramaList) => {
      const geojson = geoJSON(panoramas, {
        pointToLayer: createPoint,
        onEachFeature: onFeature,
      });

      const clusters = markerClusterGroup({
        spiderfyOnMaxZoom: false,
        showCoverageOnHover: false,
        removeOutsideVisibleBounds: true,
        disableClusteringAtZoom: 15,

        iconCreateFunction(cluster) {
          return divIcon({
            html: `<div>${cluster.getChildCount()}</div>`,
            className: 'clusters',
          });
        },
      });
      clusters.addLayer(geojson);
      map.addLayer(clusters);
    });
  }

  // This method must be present, even if empty because of AutoUnsubscribe
  ngOnDestroy(): void {
    // We'll throw an error if it doesn't
  }
}
