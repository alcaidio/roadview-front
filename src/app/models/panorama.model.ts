export interface Panorama {
  id: number;
  type: 'Feature';
  geometry: GeoJSON.Geometry;
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
