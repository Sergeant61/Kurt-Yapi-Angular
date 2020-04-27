import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsMakinesiCalismaCreateEditComponent } from './is-makinesi-calisma-create-edit.component';

describe('IsMakinesiCalismaCreateEditComponent', () => {
  let component: IsMakinesiCalismaCreateEditComponent;
  let fixture: ComponentFixture<IsMakinesiCalismaCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsMakinesiCalismaCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsMakinesiCalismaCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
