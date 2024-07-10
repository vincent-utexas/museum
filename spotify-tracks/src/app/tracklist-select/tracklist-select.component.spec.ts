import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracklistSelectComponent } from './tracklist-select.component';

describe('TracklistSelectComponent', () => {
  let component: TracklistSelectComponent;
  let fixture: ComponentFixture<TracklistSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TracklistSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TracklistSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
