import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienvenidaAdminComponent } from './bienvenida-admin.component';

describe('BienvenidaAdminComponent', () => {
  let component: BienvenidaAdminComponent;
  let fixture: ComponentFixture<BienvenidaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BienvenidaAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BienvenidaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
