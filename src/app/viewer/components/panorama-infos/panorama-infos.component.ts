import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Panorama } from '../../models/panorama.model';
import { PanoramasState } from '../../store';

@Component({
  selector: 'app-panorama-infos',
  templateUrl: './panorama-infos.component.html',
  styleUrls: ['./panorama-infos.component.scss'],
})
export class PanoramaInfosComponent {
  @Select(PanoramasState.getSelectedPanorama) panorama$: Observable<Panorama>;
}
