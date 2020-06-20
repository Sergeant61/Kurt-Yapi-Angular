import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmaRaporComponent } from './firma-rapor.component';

describe('FirmaRaporComponent', () => {
  let component: FirmaRaporComponent;
  let fixture: ComponentFixture<FirmaRaporComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmaRaporComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmaRaporComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
