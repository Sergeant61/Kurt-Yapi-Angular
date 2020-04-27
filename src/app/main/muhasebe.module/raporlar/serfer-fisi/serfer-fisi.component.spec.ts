import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerferFisiComponent } from './serfer-fisi.component';

describe('SerferFisiComponent', () => {
  let component: SerferFisiComponent;
  let fixture: ComponentFixture<SerferFisiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerferFisiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerferFisiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
