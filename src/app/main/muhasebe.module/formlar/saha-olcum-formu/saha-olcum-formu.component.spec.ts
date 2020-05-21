import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SahaOlcumFormuComponent } from './saha-olcum-formu.component';

describe('SahaOlcumFormuComponent', () => {
  let component: SahaOlcumFormuComponent;
  let fixture: ComponentFixture<SahaOlcumFormuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SahaOlcumFormuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SahaOlcumFormuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
