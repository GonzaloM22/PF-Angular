import { createReducer, on } from '@ngrx/store';
import { UsuarioState } from '../../models/usuario.state';
import { usuariosCargados, cargarUsuarios } from '../actions/usuario.action';

export const estadoInicial: UsuarioState = {
  loading: false,
  usuarios: [],
};

export const usuariosReducer = createReducer(
  estadoInicial,
  on(cargarUsuarios, (estado) => {
    return { ...estado, loading: true };
  }),
  on(usuariosCargados, (estado, { usuarios }) => {
    return { ...estado, loading: false, usuarios };
  })
);
