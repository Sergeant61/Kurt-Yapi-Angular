import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerMesaiPuantajiComponent } from './per-mesai-puantaji.component';

describe('PerMesaiPuantajiComponent', () => {
  let component: PerMesaiPuantajiComponent;
  let fixture: ComponentFixture<PerMesaiPuantajiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerMesaiPuantajiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerMesaiPuantajiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
