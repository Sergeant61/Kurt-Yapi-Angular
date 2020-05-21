import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTuruComponent } from './form-turu.component';

describe('FormTuruComponent', () => {
  let component: FormTuruComponent;
  let fixture: ComponentFixture<FormTuruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTuruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTuruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
