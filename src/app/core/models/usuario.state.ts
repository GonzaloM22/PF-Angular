import { Usuario } from './usuario';

export interface UsuarioState {
  loading: boolean;
  usuarios: Usuario[];
}
