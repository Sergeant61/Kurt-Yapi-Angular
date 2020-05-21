import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SahaOlcumFormuCreateEditComponent } from './saha-olcum-formu-create-edit.component';

describe('SahaOlcumFormuCreateEditComponent', () => {
  let component: SahaOlcumFormuCreateEditComponent;
  let fixture: ComponentFixture<SahaOlcumFormuCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SahaOlcumFormuCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SahaOlcumFormuCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
