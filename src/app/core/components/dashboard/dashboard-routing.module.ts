import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../shared/auth.guard';
import { CrearCursoComponent } from './crear-curso/crear-curso.component';
import { CrearInscripcionComponent } from './crear-inscripcion/crear-inscripcion.component';
import { CursosComponent } from './cursos/cursos.component';
import { DashboardComponent } from './dashboard.component';
import { CrearAlumnoComponent } from './crear-alumno/crear-alumno.component';
import { InscripcionesComponent } from './inscripciones/inscripciones.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'crear-alumno', component: CrearAlumnoComponent },
      { path: 'alumnos', component: AlumnosComponent },
      { path: 'crear-curso', component: CrearCursoComponent },
      { path: 'cursos', component: CursosComponent },
      { path: 'inscripciones', component: InscripcionesComponent },
      { path: 'crear-inscripcion', component: CrearInscripcionComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'crear-usuario', component: CrearUsuarioComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
