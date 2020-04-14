import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GelenYakitFormuComponent } from './gelen-yakit-formu.component';

describe('GelenYakitFormuComponent', () => {
  let component: GelenYakitFormuComponent;
  let fixture: ComponentFixture<GelenYakitFormuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GelenYakitFormuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GelenYakitFormuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
