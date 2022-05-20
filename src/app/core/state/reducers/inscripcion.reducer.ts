import { createReducer, on } from '@ngrx/store';
import { InscripcionState } from '../../models/inscripcion.state';
import {
  InscripcionesCargadas,
  cargarInscripciones,
} from '../actions/inscripcion.action';

export const estadoInicial: InscripcionState = {
  loading: false,
  inscripciones: [],
};

export const inscripcionesReducer = createReducer(
  estadoInicial,
  on(cargarInscripciones, (estado) => {
    return { ...estado, loading: true };
  }),
  on(InscripcionesCargadas, (estado, { inscripciones }) => {
    return { ...estado, loading: false, inscripciones };
  })
);
