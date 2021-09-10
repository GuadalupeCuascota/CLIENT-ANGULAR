import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentoriasAgendadasComponent } from './mentorias-agendadas.component';

describe('MentoriasAgendadasComponent', () => {
  let component: MentoriasAgendadasComponent;
  let fixture: ComponentFixture<MentoriasAgendadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentoriasAgendadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MentoriasAgendadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
