import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMuseosComponent } from './lista-museos.component';

describe('ListaMuseosComponent', () => {
  let component: ListaMuseosComponent;
  let fixture: ComponentFixture<ListaMuseosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaMuseosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaMuseosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
