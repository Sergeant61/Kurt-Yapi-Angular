import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HakedisEditComponent } from './hakedis-edit.component';

describe('HakedisEditComponent', () => {
  let component: HakedisEditComponent;
  let fixture: ComponentFixture<HakedisEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HakedisEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HakedisEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
