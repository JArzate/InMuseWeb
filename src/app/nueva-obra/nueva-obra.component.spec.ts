import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaObraComponent } from './nueva-obra.component';

describe('NuevaObraComponent', () => {
  let component: NuevaObraComponent;
  let fixture: ComponentFixture<NuevaObraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaObraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
