import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSlideComponent } from './time-slide.component';

describe('TimeSlideComponent', () => {
  let component: TimeSlideComponent;
  let fixture: ComponentFixture<TimeSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
