import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DokumSahasiFormComponent } from './dokum-sahasi-form.component';

describe('DokumSahasiFormComponent', () => {
  let component: DokumSahasiFormComponent;
  let fixture: ComponentFixture<DokumSahasiFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DokumSahasiFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DokumSahasiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
