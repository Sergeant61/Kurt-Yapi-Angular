import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GidenYakitFormuCreateEditComponent } from './giden-yakit-formu-create-edit.component';

describe('GidenYakitFormuCreateEditComponent', () => {
  let component: GidenYakitFormuCreateEditComponent;
  let fixture: ComponentFixture<GidenYakitFormuCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GidenYakitFormuCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GidenYakitFormuCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
