import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TirKamyonCalismaCreateEditComponent } from './tir-kamyon-calisma-create-edit.component';

describe('TirKamyonCalismaCreateEditComponent', () => {
  let component: TirKamyonCalismaCreateEditComponent;
  let fixture: ComponentFixture<TirKamyonCalismaCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TirKamyonCalismaCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TirKamyonCalismaCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
