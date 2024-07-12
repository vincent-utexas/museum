import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentifierFormComponent } from './identifier-form.component';

describe('IdentifierFormComponent', () => {
  let component: IdentifierFormComponent;
  let fixture: ComponentFixture<IdentifierFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdentifierFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdentifierFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
