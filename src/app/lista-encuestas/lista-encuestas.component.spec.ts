import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEncuestasComponent } from './lista-encuestas.component';

describe('ListaEncuestasComponent', () => {
  let component: ListaEncuestasComponent;
  let fixture: ComponentFixture<ListaEncuestasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEncuestasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEncuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
