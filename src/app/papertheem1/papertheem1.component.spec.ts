import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Papertheem1Component } from './papertheem1.component';

describe('Papertheem1Component', () => {
  let component: Papertheem1Component;
  let fixture: ComponentFixture<Papertheem1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Papertheem1Component]
    });
    fixture = TestBed.createComponent(Papertheem1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
