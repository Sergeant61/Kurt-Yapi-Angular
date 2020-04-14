import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsMakinesiCalismaFormuComponent } from './is-makinesi-calisma-formu.component';

describe('IsMakinesiCalismaFormuComponent', () => {
  let component: IsMakinesiCalismaFormuComponent;
  let fixture: ComponentFixture<IsMakinesiCalismaFormuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsMakinesiCalismaFormuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsMakinesiCalismaFormuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
