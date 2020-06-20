import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HakedisListComponent } from './hakedis-list.component';

describe('HakedisListComponent', () => {
  let component: HakedisListComponent;
  let fixture: ComponentFixture<HakedisListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HakedisListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HakedisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
