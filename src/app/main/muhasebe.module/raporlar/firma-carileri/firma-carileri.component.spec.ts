import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmaCarileriComponent } from './firma-carileri.component';

describe('FirmaCarileriComponent', () => {
  let component: FirmaCarileriComponent;
  let fixture: ComponentFixture<FirmaCarileriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmaCarileriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmaCarileriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
