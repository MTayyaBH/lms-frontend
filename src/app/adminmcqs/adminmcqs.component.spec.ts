import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmcqsComponent } from './adminmcqs.component';

describe('AdminmcqsComponent', () => {
  let component: AdminmcqsComponent;
  let fixture: ComponentFixture<AdminmcqsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminmcqsComponent]
    });
    fixture = TestBed.createComponent(AdminmcqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
