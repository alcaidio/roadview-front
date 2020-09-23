import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanoramaInfosComponent } from './panorama-infos.component';

describe('PanoramaInfosComponent', () => {
  let component: PanoramaInfosComponent;
  let fixture: ComponentFixture<PanoramaInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanoramaInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanoramaInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
