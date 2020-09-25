export interface Panorama {
  id: number;
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
  properties: {
    image: string;
    direction: number;
    timestamp: number;
    hotspots?: Hotspot[];
  };
}

export interface PanoramaList {
  type: 'FeatureCollection';
  features: Panorama[];
}

export interface Hotspot {
  panoId: number;
  distance: number;
  direction: number;
}

export interface ViewParams {
  fov: number;
  pitch: number;
  roll: number;
  yaw: number;
}
