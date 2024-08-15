import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarttestComponent } from './starttest.component';

describe('StarttestComponent', () => {
  let component: StarttestComponent;
  let fixture: ComponentFixture<StarttestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StarttestComponent]
    });
    fixture = TestBed.createComponent(StarttestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
