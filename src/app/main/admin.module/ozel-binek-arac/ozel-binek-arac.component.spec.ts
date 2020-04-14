import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OzelBinekAracComponent } from './ozel-binek-arac.component';

describe('OzelBinekAracComponent', () => {
  let component: OzelBinekAracComponent;
  let fixture: ComponentFixture<OzelBinekAracComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OzelBinekAracComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OzelBinekAracComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
