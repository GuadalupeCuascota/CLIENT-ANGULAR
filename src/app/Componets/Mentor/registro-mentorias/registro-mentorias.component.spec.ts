import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroMentoriasComponent } from './registro-mentorias.component';

describe('RegistroMentoriasComponent', () => {
  let component: RegistroMentoriasComponent;
  let fixture: ComponentFixture<RegistroMentoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroMentoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroMentoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
