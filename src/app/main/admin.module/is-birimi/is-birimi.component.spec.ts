import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsBirimiComponent } from './is-birimi.component';

describe('IsBirimiComponent', () => {
  let component: IsBirimiComponent;
  let fixture: ComponentFixture<IsBirimiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsBirimiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsBirimiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
