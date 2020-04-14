import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TirKamyonComponent } from './tir-kamyon.component';

describe('TirKamyonComponent', () => {
  let component: TirKamyonComponent;
  let fixture: ComponentFixture<TirKamyonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TirKamyonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TirKamyonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
