import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilesMujeresComponent } from './perfiles-mujeres.component';

describe('PerfilesMujeresComponent', () => {
  let component: PerfilesMujeresComponent;
  let fixture: ComponentFixture<PerfilesMujeresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilesMujeresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilesMujeresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
