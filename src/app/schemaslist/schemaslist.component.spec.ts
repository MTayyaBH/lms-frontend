import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaslistComponent } from './schemaslist.component';

describe('SchemaslistComponent', () => {
  let component: SchemaslistComponent;
  let fixture: ComponentFixture<SchemaslistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchemaslistComponent]
    });
    fixture = TestBed.createComponent(SchemaslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
