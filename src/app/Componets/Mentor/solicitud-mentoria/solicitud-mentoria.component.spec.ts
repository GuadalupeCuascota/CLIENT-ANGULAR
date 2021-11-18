import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudMentoriaComponent } from './solicitud-mentoria.component';

describe('SolicitudMentoriaComponent', () => {
  let component: SolicitudMentoriaComponent;
  let fixture: ComponentFixture<SolicitudMentoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudMentoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudMentoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
