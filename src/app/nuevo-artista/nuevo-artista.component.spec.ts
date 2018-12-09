import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoArtistaComponent } from './nuevo-artista.component';

describe('NuevoArtistaComponent', () => {
  let component: NuevoArtistaComponent;
  let fixture: ComponentFixture<NuevoArtistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoArtistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoArtistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
