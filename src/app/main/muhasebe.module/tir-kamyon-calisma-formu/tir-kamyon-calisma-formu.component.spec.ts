import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TirKamyonCalismaFormuComponent } from './tir-kamyon-calisma-formu.component';

describe('TirKamyonCalismaFormuComponent', () => {
  let component: TirKamyonCalismaFormuComponent;
  let fixture: ComponentFixture<TirKamyonCalismaFormuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TirKamyonCalismaFormuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TirKamyonCalismaFormuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
