import { createSelector } from '@ngrx/store';
import { AlumnoState } from '../../models/alumno.state';
import { AppState } from '../app.state';

export const selectorAlumno = (state: AppState) => state.alumnos;

export const selectorCargandoAlumnos = createSelector(
  selectorAlumno,
  (state: AlumnoState) => state.loading
);

export const selectorListaAlumnos = createSelector(
  selectorAlumno,
  (state: AlumnoState) => state.alumnos
);
