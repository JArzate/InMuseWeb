import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRecorridosComponent } from './lista-recorridos.component';

describe('ListaRecorridosComponent', () => {
  let component: ListaRecorridosComponent;
  let fixture: ComponentFixture<ListaRecorridosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaRecorridosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRecorridosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
