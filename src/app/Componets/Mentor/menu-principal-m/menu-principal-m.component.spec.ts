import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPrincipalMComponent } from './menu-principal-m.component';

describe('MenuPrincipalMComponent', () => {
  let component: MenuPrincipalMComponent;
  let fixture: ComponentFixture<MenuPrincipalMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuPrincipalMComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPrincipalMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
