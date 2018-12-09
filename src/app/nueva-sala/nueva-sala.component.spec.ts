import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaSalaComponent } from './nueva-sala.component';

describe('NuevaSalaComponent', () => {
  let component: NuevaSalaComponent;
  let fixture: ComponentFixture<NuevaSalaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaSalaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
