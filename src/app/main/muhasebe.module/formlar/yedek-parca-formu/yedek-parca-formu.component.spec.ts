import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YedekParcaFormuComponent } from './yedek-parca-formu.component';

describe('YedekParcaFormuComponent', () => {
  let component: YedekParcaFormuComponent;
  let fixture: ComponentFixture<YedekParcaFormuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YedekParcaFormuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YedekParcaFormuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
