import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChemistryComponent } from './chemistry.component';

describe('ChemistryComponent', () => {
  let component: ChemistryComponent;
  let fixture: ComponentFixture<ChemistryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChemistryComponent]
    });
    fixture = TestBed.createComponent(ChemistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
