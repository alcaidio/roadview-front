import { Component, Input } from '@angular/core';
import { Panorama } from '../../models/panorama.model';

@Component({
  selector: 'app-panorama-infos',
  templateUrl: './panorama-infos.component.html',
  styleUrls: ['./panorama-infos.component.scss'],
})
export class PanoramaInfosComponent {
  @Input() panorama: Panorama;
}
