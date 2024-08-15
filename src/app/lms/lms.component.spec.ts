import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LMSComponent } from './lms.component';

describe('LMSComponent', () => {
  let component: LMSComponent;
  let fixture: ComponentFixture<LMSComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LMSComponent]
    });
    fixture = TestBed.createComponent(LMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
