import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GunlukRaporComponent } from './gunluk-rapor.component';

describe('GunlukRaporComponent', () => {
  let component: GunlukRaporComponent;
  let fixture: ComponentFixture<GunlukRaporComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GunlukRaporComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GunlukRaporComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
