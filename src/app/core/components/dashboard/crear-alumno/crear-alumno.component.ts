import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alumno } from '../../../models/alumno';
import { AlumnoService } from '../../../services/alumno.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-alumno',
  templateUrl: './crear-alumno.component.html',
  styleUrls: ['./crear-alumno.component.css'],
})
export class CrearAlumnoComponent implements OnInit {
  formAlumnos: FormGroup;
  titulo: String = 'Nuevo';
  boton: String = 'Agregar';
  alumnoEditar?: Alumno;
  data2: any;

  constructor(
    private _alumnoService: AlumnoService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CrearAlumnoComponent>,
    private router: Router
  ) {
    this.formAlumnos = this.fb.group({
      id: [''],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      edad: ['', [Validators.required, Validators.min(2)]],
      sexo: ['', [Validators.required]],
      legajo: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.max(10)]],
      observaciones: ['Ninguna'],
    });
  }

  ngOnInit(): void {
    this.editarAlumno();
  }

  guardarAlumno() {
    if (!this._alumnoService.alumnoEditar) {
      this._alumnoService.agregarAlumno(this.formAlumnos.value).subscribe();

      this.formAlumnos.reset();

      this._snackBar.open('Alumno guardado con exito', '', {
        duration: 2000,
      });

      this.router.navigate(['dashboard', 'alumnos']);
    } else {
      this._alumnoService.editarAlumno(this.formAlumnos.value).subscribe();

      this.formAlumnos.reset();

      this._snackBar.open('Alumno editado con exito', '', {
        duration: 2000,
      });

      this._alumnoService.alumnoEditar = undefined;
      this.router.navigate(['dashboard', 'alumnos']);
    }
  }

  editarAlumno() {
    this.alumnoEditar = this._alumnoService.alumnoEditar;

    if (this.alumnoEditar) {
      this.titulo = 'Editar';
      this.boton = 'Editar';

      this.formAlumnos.setValue({
        id: this.alumnoEditar.id,
        nombre: this.alumnoEditar.nombre,
        edad: this.alumnoEditar.edad,
        sexo: this.alumnoEditar.sexo,
        legajo: this.alumnoEditar.legajo,
        email: this.alumnoEditar.email,
        observaciones: this.alumnoEditar.observaciones,
      });
    }
  }

  get promedio() {
    return this.formAlumnos.get('promedio');
  }
  get edad() {
    return this.formAlumnos.get('edad');
  }
  get nombre() {
    return this.formAlumnos.get('nombre');
  }
  get sexo() {
    return this.formAlumnos.get('sexo');
  }
  get legajo() {
    return this.formAlumnos.get('legajo');
  }
}
