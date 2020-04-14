import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsMakinesiFormComponent } from './is-makinesi-form.component';

describe('IsMakinesiFormComponent', () => {
  let component: IsMakinesiFormComponent;
  let fixture: ComponentFixture<IsMakinesiFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsMakinesiFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsMakinesiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
