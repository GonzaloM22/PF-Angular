import { createReducer, on } from '@ngrx/store';
import { AlumnoState } from '../../models/alumno.state';
import { alumnosCargados, cargarAlumnos } from '../actions/alumno.action';

export const estadoInicial: AlumnoState = {
  loading: false,
  alumnos: [],
};

export const alumnosReducer = createReducer(
  estadoInicial,
  on(cargarAlumnos, (estado) => {
    return { ...estado, loading: true };
  }),
  on(alumnosCargados, (estado, { alumnos }) => {
    return { ...estado, loading: false, alumnos };
  })
);
