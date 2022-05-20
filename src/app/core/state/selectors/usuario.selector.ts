import { createSelector } from '@ngrx/store';
import { UsuarioState } from '../../models/usuario.state';
import { AppState } from '../app.state';

export const selectorUsuario = (state: AppState) => state.usuarios;

export const selectorCargandoUsuarios = createSelector(
  selectorUsuario,
  (state: UsuarioState) => state.loading
);

export const selectorListaUsuarios = createSelector(
  selectorUsuario,
  (state: UsuarioState) => state.usuarios
);
