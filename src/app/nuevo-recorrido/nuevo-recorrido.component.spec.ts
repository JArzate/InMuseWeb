import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoRecorridoComponent } from './nuevo-recorrido.component';

describe('NuevoRecorridoComponent', () => {
  let component: NuevoRecorridoComponent;
  let fixture: ComponentFixture<NuevoRecorridoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoRecorridoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoRecorridoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
