import { createAction, props } from '@ngrx/store';
import { Usuario } from 'src/app/core/models/usuario';

export const cargarUsuarios = createAction(
  '[Listado de usuarios] Cargar usuarios'
);

export const usuariosCargados = createAction(
  '[Listado de usuarios] Usuarios cargados',
  props<{ usuarios: Usuario[] }>()
);
