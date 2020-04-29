import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerMesaiOdemesiComponent } from './per-mesai-odemesi.component';

describe('PerMesaiOdemesiComponent', () => {
  let component: PerMesaiOdemesiComponent;
  let fixture: ComponentFixture<PerMesaiOdemesiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerMesaiOdemesiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerMesaiOdemesiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
