import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { InscripcionesComponent } from './inscripciones/inscripciones.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { CrearAlumnoComponent } from './crear-alumno/crear-alumno.component';
import { CrearCursoComponent } from './crear-curso/crear-curso.component';
import { CursosComponent } from './cursos/cursos.component';
import { CrearInscripcionComponent } from './crear-inscripcion/crear-inscripcion.component';
import { SharedModule } from '../../shared/shared.module';
import { AlumnoService } from '../../services/alumno.service';
import { CursoService } from '../../services/curso.service';
import { InscripcionService } from '../../services/inscripcion.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';

@NgModule({
  declarations: [
    CrearAlumnoComponent,
    AlumnosComponent,
    InscripcionesComponent,
    CrearCursoComponent,
    CursosComponent,
    CrearInscripcionComponent,
    UsuariosComponent,
    CrearUsuarioComponent,
  ],

  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    AlumnoService,
    CursoService,
    InscripcionService,
  ],
  exports: [SharedModule],
})
export class DashboardModule {}
