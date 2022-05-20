import { createReducer, on } from '@ngrx/store';
import { CursoState } from '../../models/curso.state';
import { cursosCargados, cargarCursos } from '../actions/curso.action';

export const estadoInicial: CursoState = {
  loading: false,
  cursos: [],
};

export const cursosReducer = createReducer(
  estadoInicial,
  on(cargarCursos, (estado) => {
    return { ...estado, loading: true };
  }),
  on(cursosCargados, (estado, { cursos }) => {
    return { ...estado, loading: false, cursos };
  })
);
