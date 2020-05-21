import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SantiyeComponent } from './santiye.component';

describe('SantiyeComponent', () => {
  let component: SantiyeComponent;
  let fixture: ComponentFixture<SantiyeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SantiyeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SantiyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
