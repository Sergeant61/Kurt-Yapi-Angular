import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DokumSahasiComponent } from './dokum-sahasi.component';

describe('DokumSahasiComponent', () => {
  let component: DokumSahasiComponent;
  let fixture: ComponentFixture<DokumSahasiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DokumSahasiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DokumSahasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
