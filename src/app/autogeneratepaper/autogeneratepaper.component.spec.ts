import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutogeneratepaperComponent } from './autogeneratepaper.component';

describe('AutogeneratepaperComponent', () => {
  let component: AutogeneratepaperComponent;
  let fixture: ComponentFixture<AutogeneratepaperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutogeneratepaperComponent]
    });
    fixture = TestBed.createComponent(AutogeneratepaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
