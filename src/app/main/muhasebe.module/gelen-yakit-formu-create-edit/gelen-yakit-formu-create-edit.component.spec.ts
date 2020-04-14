import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GelenYakitFormuCreateEditComponent } from './gelen-yakit-formu-create-edit.component';

describe('GelenYakitFormuCreateEditComponent', () => {
  let component: GelenYakitFormuCreateEditComponent;
  let fixture: ComponentFixture<GelenYakitFormuCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GelenYakitFormuCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GelenYakitFormuCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
