import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursoService } from '../../../services/curso.service';
import { AlumnoService } from '../../../services/alumno.service';
import { Curso } from '../../../models/curso';
import { Alumno } from '../../../models/alumno';
import { Inscripcion } from '../../../models/inscripcion';
import { InscripcionService } from 'src/app/core/services/inscripcion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-inscripcion',
  templateUrl: './crear-inscripcion.component.html',
  styleUrls: ['./crear-inscripcion.component.css'],
})
export class CrearInscripcionComponent implements OnInit {
  formInscripcion: FormGroup;
  cursos: Curso[];
  alumnos: Alumno[];
  inscripcionEditar?: Inscripcion;
  titulo: string;
  boton: string;

  constructor(
    private fb: FormBuilder,
    private _cursoService: CursoService,
    private _alumnoService: AlumnoService,
    private _inscripcionService: InscripcionService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.formInscripcion = this.fb.group({
      id: [''],
      alumno: ['', [Validators.required, Validators.min(3)]],
      curso: ['', [Validators.required, Validators.min(3)]],
    });

    this.cursos = [];
    this.alumnos = [];
    this.titulo = 'Nueva';
    this.boton = 'Agregar';
  }

  ngOnInit(): void {
    this.editarInscripcion();
    this._cursoService
      .obtenerCursos()
      .subscribe((curso) => (this.cursos = curso));
    this._alumnoService
      .obtenerAlumnos()
      .subscribe((alumno) => (this.alumnos = alumno));
  }

  agregarInscripcion() {
    if (!this._inscripcionService.inscripcionEditar) {
      this._inscripcionService
        .agregarInscripcion(this.formInscripcion.value)
        .subscribe();

      this.formInscripcion.reset();

      this._snackBar.open('Inscripcion guardada con exito', '', {
        duration: 2000,
      });
      this.router.navigate(['dashboard', 'inscripciones']);
    } else {
      this._inscripcionService
        .editarInscripcion(this.formInscripcion.value)
        .subscribe();

      this.formInscripcion.reset();

      this._snackBar.open('Inscripcion editada con exito', '', {
        duration: 2000,
      });

      this._inscripcionService.inscripcionEditar = undefined;
      this.router.navigate(['dashboard', 'inscripciones']);
    }
  }

  editarInscripcion() {
    this.inscripcionEditar = this._inscripcionService.inscripcionEditar;

    if (this.inscripcionEditar) {
      this.titulo = 'Editar';
      this.boton = 'Editar';

      this.formInscripcion.setValue({
        id: this.inscripcionEditar.id,
        alumno: this.inscripcionEditar.alumno,
        curso: this.inscripcionEditar.curso,
      });
    }
  }
}
