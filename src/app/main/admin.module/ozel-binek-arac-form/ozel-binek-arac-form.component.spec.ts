import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OzelBinekAracFormComponent } from './ozel-binek-arac-form.component';

describe('OzelBinekAracFormComponent', () => {
  let component: OzelBinekAracFormComponent;
  let fixture: ComponentFixture<OzelBinekAracFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OzelBinekAracFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OzelBinekAracFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
