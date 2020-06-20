import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MalzemeCinsiComponent } from './malzeme-cinsi.component';

describe('MalzemeCinsiComponent', () => {
  let component: MalzemeCinsiComponent;
  let fixture: ComponentFixture<MalzemeCinsiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MalzemeCinsiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MalzemeCinsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
