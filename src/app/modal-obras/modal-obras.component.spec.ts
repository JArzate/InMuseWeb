import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalObrasComponent } from './modal-obras.component';

describe('ModalObrasComponent', () => {
  let component: ModalObrasComponent;
  let fixture: ComponentFixture<ModalObrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalObrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalObrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
