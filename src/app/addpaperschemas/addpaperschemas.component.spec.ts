import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpaperschemasComponent } from './addpaperschemas.component';

describe('AddpaperschemasComponent', () => {
  let component: AddpaperschemasComponent;
  let fixture: ComponentFixture<AddpaperschemasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddpaperschemasComponent]
    });
    fixture = TestBed.createComponent(AddpaperschemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
