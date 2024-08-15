import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClassesComponent } from './admin-classes.component';

describe('AdminClassesComponent', () => {
  let component: AdminClassesComponent;
  let fixture: ComponentFixture<AdminClassesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminClassesComponent]
    });
    fixture = TestBed.createComponent(AdminClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
