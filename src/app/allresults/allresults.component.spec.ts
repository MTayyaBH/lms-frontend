import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllresultsComponent } from './allresults.component';

describe('AllresultsComponent', () => {
  let component: AllresultsComponent;
  let fixture: ComponentFixture<AllresultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllresultsComponent]
    });
    fixture = TestBed.createComponent(AllresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
