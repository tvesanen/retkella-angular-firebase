import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageloaderComponent } from './imageloader.component';

describe('ImageloaderComponent', () => {
  let component: ImageloaderComponent;
  let fixture: ComponentFixture<ImageloaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageloaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
