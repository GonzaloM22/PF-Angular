import { createAction, props } from '@ngrx/store';
import { Inscripcion } from 'src/app/core/models/inscripcion';

export const cargarInscripciones = createAction(
  '[Listado de inscripciones] Cargar inscripciones'
);

export const InscripcionesCargadas = createAction(
  '[Listado de inscripciones] Inscripciones cargadas',
  props<{ inscripciones: Inscripcion[] }>()
);
