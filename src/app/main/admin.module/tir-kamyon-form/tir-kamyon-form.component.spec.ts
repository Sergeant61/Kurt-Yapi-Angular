import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TirKamyonFormComponent } from './tir-kamyon-form.component';

describe('TirKamyonFormComponent', () => {
  let component: TirKamyonFormComponent;
  let fixture: ComponentFixture<TirKamyonFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TirKamyonFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TirKamyonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
