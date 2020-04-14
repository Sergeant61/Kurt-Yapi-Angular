import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GidenYakitFormuComponent } from './giden-yakit-formu.component';

describe('GidenYakitFormuComponent', () => {
  let component: GidenYakitFormuComponent;
  let fixture: ComponentFixture<GidenYakitFormuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GidenYakitFormuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GidenYakitFormuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
