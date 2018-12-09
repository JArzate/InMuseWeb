import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilMuseoComponent } from './perfil-museo.component';

describe('PerfilMuseoComponent', () => {
  let component: PerfilMuseoComponent;
  let fixture: ComponentFixture<PerfilMuseoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilMuseoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilMuseoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
