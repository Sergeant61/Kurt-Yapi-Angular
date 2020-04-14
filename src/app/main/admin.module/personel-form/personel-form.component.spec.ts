import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonelFormComponent } from './personel-form.component';

describe('PersonelFormComponent', () => {
  let component: PersonelFormComponent;
  let fixture: ComponentFixture<PersonelFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonelFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
