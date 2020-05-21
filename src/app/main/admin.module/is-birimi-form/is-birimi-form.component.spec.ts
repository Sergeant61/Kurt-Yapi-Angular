import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsBirimiFormComponent } from './is-birimi-form.component';

describe('IsBirimiFormComponent', () => {
  let component: IsBirimiFormComponent;
  let fixture: ComponentFixture<IsBirimiFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsBirimiFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsBirimiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
