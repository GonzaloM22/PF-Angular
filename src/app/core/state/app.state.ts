import { ActionReducerMap } from '@ngrx/store';
import { AlumnoState } from '../models/alumno.state';
import { CursoState } from '../models/curso.state';
import { InscripcionState } from '../models/inscripcion.state';
import { UsuarioState } from '../models/usuario.state';
import { alumnosReducer } from './reducers/alumno.reducer';
import { cursosReducer } from './reducers/curso.reducer';
import { inscripcionesReducer } from './reducers/inscripcion.reducer';
import { usuariosReducer } from './reducers/usuario.reducer';

export interface AppState {
  alumnos: AlumnoState;
  cursos: CursoState;
  inscripciones: InscripcionState;
  usuarios: UsuarioState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  alumnos: alumnosReducer,
  cursos: cursosReducer,
  inscripciones: inscripcionesReducer,
  usuarios: usuariosReducer,
};
