import { createSelector } from '@ngrx/store';
import { InscripcionState } from '../../models/inscripcion.state';
import { AppState } from '../app.state';

export const selectorInscripcion = (state: AppState) => state.inscripciones;

export const selectorCargandoInscripciones = createSelector(
  selectorInscripcion,
  (state: InscripcionState) => state.loading
);

export const selectorListaInscripciones = createSelector(
  selectorInscripcion,
  (state: InscripcionState) => state.inscripciones
);
