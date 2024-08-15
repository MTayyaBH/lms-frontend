import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NineclassComponent } from './nineclass.component';

describe('NineclassComponent', () => {
  let component: NineclassComponent;
  let fixture: ComponentFixture<NineclassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NineclassComponent]
    });
    fixture = TestBed.createComponent(NineclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
