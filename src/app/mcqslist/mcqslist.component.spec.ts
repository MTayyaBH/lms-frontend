import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McqslistComponent } from './mcqslist.component';

describe('McqslistComponent', () => {
  let component: McqslistComponent;
  let fixture: ComponentFixture<McqslistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [McqslistComponent]
    });
    fixture = TestBed.createComponent(McqslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
