import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackForwardComponent } from './back-forward.component';

describe('BackForwardComponent', () => {
  let component: BackForwardComponent;
  let fixture: ComponentFixture<BackForwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackForwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackForwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
