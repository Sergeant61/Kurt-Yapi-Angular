import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SantiyeFormComponent } from './santiye-form.component';

describe('SantiyeFormComponent', () => {
  let component: SantiyeFormComponent;
  let fixture: ComponentFixture<SantiyeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SantiyeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SantiyeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
