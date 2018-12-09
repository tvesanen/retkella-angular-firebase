import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTrailComponent } from './new-trail.component';

describe('NewTrailComponent', () => {
  let component: NewTrailComponent;
  let fixture: ComponentFixture<NewTrailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTrailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
