import { createAction, props } from '@ngrx/store';
import { Curso } from 'src/app/core/models/curso';

export const cargarCursos = createAction('[Listado de cursos] Cargar cursos');

export const cursosCargados = createAction(
  '[Listado de cursos] Cursos cargados',
  props<{ cursos: Curso[] }>()
);
