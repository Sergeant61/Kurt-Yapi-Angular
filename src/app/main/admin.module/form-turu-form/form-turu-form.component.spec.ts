import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTuruFormComponent } from './form-turu-form.component';

describe('FormTuruFormComponent', () => {
  let component: FormTuruFormComponent;
  let fixture: ComponentFixture<FormTuruFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTuruFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTuruFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
