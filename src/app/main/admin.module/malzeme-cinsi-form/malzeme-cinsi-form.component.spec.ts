import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MalzemeCinsiFormComponent } from './malzeme-cinsi-form.component';

describe('MalzemeCinsiFormComponent', () => {
  let component: MalzemeCinsiFormComponent;
  let fixture: ComponentFixture<MalzemeCinsiFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MalzemeCinsiFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MalzemeCinsiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
