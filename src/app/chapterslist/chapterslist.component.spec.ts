import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterslistComponent } from './chapterslist.component';

describe('ChapterslistComponent', () => {
  let component: ChapterslistComponent;
  let fixture: ComponentFixture<ChapterslistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChapterslistComponent]
    });
    fixture = TestBed.createComponent(ChapterslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
