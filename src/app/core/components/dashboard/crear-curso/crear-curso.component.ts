import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursoService } from '../../../services/curso.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Curso } from 'src/app/core/models/curso';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.css'],
})
export class CrearCursoComponent implements OnInit {
  formCursos: FormGroup;
  cursoEditar?: Curso;
  titulo: string;
  boton: string;
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _cursoService: CursoService,
    private router: Router
  ) {
    this.formCursos = this.fb.group({
      id: [''],
      nombre: ['', [Validators.required, Validators.min(3)]],
      descripcion: ['', [Validators.required, Validators.min(4)]],
      fechaInicio: ['', [Validators.required]],
      duracion: ['', [Validators.required, Validators.min(2)]],
      precio: ['', [Validators.required]],
    });

    this.titulo = 'Nuevo';
    this.boton = 'Agregar';
  }

  ngOnInit(): void {
    this.editarCurso();
  }

  agregarCurso() {
    if (!this._cursoService.cursoEditar) {
      this._cursoService.agregarCurso(this.formCursos.value).subscribe();

      this.formCursos.reset();

      this._snackBar.open('Curso guardado con exito', '', {
        duration: 2000,
      });
      this.router.navigate(['dashboard', 'cursos']);
    } else {
      this._cursoService.editarAlumno(this.formCursos.value).subscribe();

      this.formCursos.reset();

      this._snackBar.open('Curso editado con exito', '', {
        duration: 2000,
      });

      this._cursoService.cursoEditar = undefined;
      this.router.navigate(['dashboard', 'cursos']);
    }
  }

  editarCurso() {
    this.cursoEditar = this._cursoService.cursoEditar;

    if (this.cursoEditar) {
      this.titulo = 'Editar';
      this.boton = 'Editar';

      this.formCursos.setValue({
        id: this.cursoEditar.id,
        nombre: this.cursoEditar.nombre,
        descripcion: this.cursoEditar.descripcion,
        fechaInicio: this.cursoEditar.fechaInicio,
        duracion: this.cursoEditar.duracion,
        precio: this.cursoEditar.precio,
      });
    }
  }
}
