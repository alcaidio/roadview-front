import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PanoramaService } from '../../services/panorama.service';
import { ViewerService } from '../../services/viewer.service';
import { Panorama } from './../../models/panorama.model';

@Component({
  selector: 'app-back-forward',
  templateUrl: './back-forward.component.html',
  styleUrls: ['./back-forward.component.scss'],
})
export class BackForwardComponent implements OnInit {
  panorama$: Observable<Panorama>;
  constructor(
    private viewerService: ViewerService,
    private panoramaService: PanoramaService
  ) {}

  ngOnInit(): void {
    this.panorama$ = this.viewerService.getPanorama();
  }

}
