import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaArtistasComponent } from './lista-artistas.component';

describe('ListaArtistasComponent', () => {
  let component: ListaArtistasComponent;
  let fixture: ComponentFixture<ListaArtistasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaArtistasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaArtistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
