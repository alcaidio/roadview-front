import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Panorama } from '../../models/panorama.model';
import { ViewerService } from '../../services/viewer.service';

@Component({
  selector: 'app-panorama-infos',
  templateUrl: './panorama-infos.component.html',
  styleUrls: ['./panorama-infos.component.scss'],
})
export class PanoramaInfosComponent implements OnInit {
  panorama$: Observable<Panorama>;
  constructor(private viewerService: ViewerService) {}

  ngOnInit(): void {
    this.panorama$ = this.viewerService.getPanorama();
  }
}
