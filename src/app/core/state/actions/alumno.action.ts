import { createAction, props } from '@ngrx/store';
import { Alumno } from 'src/app/core/models/alumno';

export const cargarAlumnos = createAction(
  '[Listado de alumnos] Cargar alumnos'
);

export const alumnosCargados = createAction(
  '[Listado de alumnos] Alumnos cargados',
  props<{ alumnos: Alumno[] }>()
);
