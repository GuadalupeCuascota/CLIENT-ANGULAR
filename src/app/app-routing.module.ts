import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioListComponent } from './Componets/Administrador/usuario-list/usuario-list.component';
import { RolesListComponent } from './Componets/Administrador/roles-list/roles-list.component';
import { MenuPrincipalEditorComponent } from './Componets/Editor/menu-principal-editor/menu-principal-editor.component';
import { MenuPublicacionComponent } from './Componets/Editor/menu-publicacion/menu-publicacion.component';
import { RegistroUsuarioComponent } from './Componets/Administrador/menu-principal/registro-usuario.component';
import { LoginComponent } from './Componets/Login/login.component';
import { PerfilesMujeresComponent } from './Componets/Editor/perfiles-mujeres/perfiles-mujeres.component';
import { NoticiasComponent } from './Componets/Editor/noticias/noticias.component';
import { RegistroMentoriasComponent} from './Componets/Mentor/registro-mentorias/registro-mentorias.component';
import {OfertaAcademicaComponent } from './Componets/Editor/oferta-academica/oferta-academica.component';
import { LoginGuard } from './Services/Login/login.guard';
import {RolesGuard} from './Services/Login/roles.guard';
import {IsEditorGuard} from './Services/Login/is-editor.guard'
import {IsMentorGuard} from './Services/Login/is-mentor.guard'
import { RegistroEditorComponent } from './Componets/Administrador/registro-editor/registro-editor.component';
import { MenuPrincipalMComponent } from './Componets/Mentor/menu-principal-m/menu-principal-m.component';
import { MentoriasAgendadasComponent } from './Componets/Mentor/mentorias-agendadas/mentorias-agendadas.component';
import {DashboardComponent} from './Componets/Administrador/dashboard/dashboard.component';
import {CambioContraseniaComponent} from './Componets/cambio-contrasenia/cambio-contrasenia.component'
import {CarreraComponent} from './Componets/Administrador/carrera/carrera.component'
import {MateriaListComponent} from './Componets/Administrador/materia-list/materia-list.component';
import {CrearMateriaComponent} from './Componets/Administrador/crear-materia/crear-materia.component';
import {CrearUsuarioComponent} from './Componets/Administrador/crear-usuario/crear-usuario.component';
import { BienvenidaComponent} from './Componets/Mentor/bienvenida/bienvenida.component';
import { BienvenidaAdminComponent} from './Componets/Administrador/bienvenida-admin/bienvenida-admin.component';





const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cambiarContraseña',
    component:CambioContraseniaComponent,
    canActivate: [LoginGuard]
  },

  {
    path: 'perfiles/:id',
    component: PerfilesMujeresComponent,
    canActivate: [LoginGuard,IsEditorGuard],
  },
  {
    path: 'noticias/:id',
    component: NoticiasComponent,
    canActivate: [LoginGuard,IsEditorGuard],
  },
 
  {
    path: 'oferta-academica/:id',
    component: OfertaAcademicaComponent,
    canActivate: [LoginGuard,IsEditorGuard],
   
  },

  {
    path: 'menu-publicacion',
    component: MenuPublicacionComponent,
    canActivate: [LoginGuard,IsEditorGuard],
  
  },
  
  {
    path: 'admin',
    component: RegistroUsuarioComponent,
    canActivate: [LoginGuard,RolesGuard],
    
  },
  {
    path: 'administrador',
    component: BienvenidaAdminComponent,
    canActivate: [LoginGuard,RolesGuard],
    
  },
  {
    path: 'roles',
    component: RolesListComponent,
    canActivate: [LoginGuard,RolesGuard],
  },
  {
    path: 'usuarios',
    component: UsuarioListComponent,
    canActivate: [LoginGuard,RolesGuard],
  },
  {
    path: 'editor',
    component: MenuPublicacionComponent,
    canActivate: [LoginGuard,IsEditorGuard],
  },
  // {
  //   path: 'editor',
  //   component: MenuPublicacionComponent,
  //   canActivate: [LoginGuard,IsEditorGuard],
  // },

  {
    path: 'registro-editor',
    component: RegistroEditorComponent,
    
  },
  {
    path: 'mentorMenu',
    component: MenuPrincipalMComponent,
    canActivate: [LoginGuard,IsMentorGuard]
  },
  {
    path: 'mentor',
    component: BienvenidaComponent,
    canActivate: [LoginGuard,IsMentorGuard]
  },

  {
    path: 'registro-mentorias',
    component: RegistroMentoriasComponent,
    canActivate: [LoginGuard,IsMentorGuard]
  },
  {
    path: 'mentorias-agendadas',
    component: MentoriasAgendadasComponent,
    canActivate: [LoginGuard,IsMentorGuard]
  },
  {
    path: 'dashboard',
    component:DashboardComponent,
    canActivate: [LoginGuard,RolesGuard],
    
  },
  {
    path: 'carrera',
    component:CarreraComponent,
    canActivate: [LoginGuard,RolesGuard],
  },
  {
    path: 'materia',
    component:MateriaListComponent,
    canActivate: [LoginGuard,RolesGuard],
  },
  {
    path: 'crear-materia',
    component:CrearMateriaComponent,
    canActivate: [LoginGuard,RolesGuard],
  },
  {
    path: 'crear-usuario',
    component:CrearUsuarioComponent,
    canActivate: [LoginGuard,RolesGuard],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
