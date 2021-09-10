import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPublicacionComponent } from './menu-publicacion.component';

describe('MenuPublicacionComponent', () => {
  let component: MenuPublicacionComponent;
  let fixture: ComponentFixture<MenuPublicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuPublicacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
