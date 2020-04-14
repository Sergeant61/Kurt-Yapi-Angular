import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsMakinesiComponent } from './is-makinesi.component';

describe('IsMakinesiComponent', () => {
  let component: IsMakinesiComponent;
  let fixture: ComponentFixture<IsMakinesiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsMakinesiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsMakinesiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
