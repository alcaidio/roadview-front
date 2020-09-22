import { Component, OnInit } from '@angular/core';
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
import { Observable } from 'rxjs';
import { PanoramaService } from '../../services/panorama.service';
import { ViewerService } from '../../services/viewer.service';
import { environment } from './../../../../environments/environment';
import { PanoramaList } from './../../models/panorama.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  map: Map;
  token = environment.mapbox.token;
  panoramas$: Observable<PanoramaList>;
  options: any;

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

  constructor(
    private panoramaService: PanoramaService,
    private viewService: ViewerService
  ) {}

  ngOnInit(): void {
    this.panoramas$ = this.panoramaService.getAllPanoramasWithLimit(20000);
    // add base layer to the map (option in html)
    this.options = {
      layers: [this.base],
      zoom: 15,
      center: latLng(45.79033580907452, 4.840034356839148),
      zoomControl: false,
    };
  }

  onMapReady(map: L.Map) {
    let camera: any;
    let cameraOptions: any;

    const createPoint = (feature, latlng) => {
      return marker(latlng, {
        icon: icon({
          iconUrl: 'assets/img/red.png',
          iconSize: [10, 10],
        }),
      });
    };

    // create the camera icon for the map view
    const displayCamera = (event) => {
      const direction = +event.sourceTarget.feature.properties.direction;
      cameraOptions = {
        icon: icon({
          iconUrl: 'assets/img/red2.png',
          iconSize: [35, 35],
        }),
        rotationOrigin: 'center center',
        opacity: 0.7,
      };

      if (camera !== undefined) {
        map.removeLayer(camera);
      }

      camera = marker(event.latlng, cameraOptions);
      camera.setRotationAngle(direction);

      // get the rotation of the viewer to update the camera icon on the map
      this.viewService.getRotation().subscribe((rotation) => {
        const rot = direction + rotation;
        camera.setRotationAngle(rot);
      });

      camera.addTo(map);
    };

    // zoom to the feature and add camera icon on the map, load the new panorama in the viewer
    const zoomToFeature = (e: any, layer) => {
      if (map.getZoom() < 20) {
        map.flyTo(e.latlng, 20);
      } else {
        map.flyTo(e.latlng, map.getZoom());
      }
      console.log(e.sourceTarget.feature);

      this.viewService.loadPanorama(e.sourceTarget.feature);
      displayCamera(e);
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
        disableClusteringAtZoom: 18,

        iconCreateFunction(cluster) {
          return divIcon({
            html: `<div>${cluster.getChildCount()}</div>`,
            className: 'cluster',
          });
        },
      });
      clusters.addLayer(geojson);
      map.addLayer(clusters);
    });

    // track the zoom and display points layer or not
    // map.on('zoomend', () => {
    //   if (map.getZoom() > 14) {
    //     map.addLayer(points);
    //   } else {
    //     map.removeLayer(points);
    //   }
    // });
  }
}
