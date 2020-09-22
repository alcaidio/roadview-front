import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Panorama } from '../models/panorama.model';
import { environment } from './../../../environments/environment';
import { PanoramaList } from './../models/panorama.model';

@Injectable({
  providedIn: 'root',
})
export class PanoramaService {
  api = `${environment.api.imerview}/panoramas`;

  constructor(private http: HttpClient) {}

  getAllPanoramas(): Observable<PanoramaList> {
    return this.http.get<PanoramaList>(`${this.api}`);
  }

  getAllPanoramasWithLimit(limit: number): Observable<PanoramaList> {
    return this.http.get<PanoramaList>(`${this.api}?limit=${limit}`);
  }

  getOnePanorama(id: number): Observable<Panorama> {
    return this.http.get<Panorama>(`${this.api}/${id}}`);
  }

  getOnePanoramaWithHotspot(
    id: number,
    from: number,
    to: number
  ): Observable<Panorama> {
    return this.http.get<Panorama>(
      `${this.api}/${id}/hotspots?from=${from}&to=${to}`
    );
  }
}
