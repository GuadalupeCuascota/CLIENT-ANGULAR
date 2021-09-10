import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPrincipalEditorComponent } from './menu-principal-editor.component';

describe('MenuPrincipalEditorComponent', () => {
  let component: MenuPrincipalEditorComponent;
  let fixture: ComponentFixture<MenuPrincipalEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuPrincipalEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPrincipalEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
