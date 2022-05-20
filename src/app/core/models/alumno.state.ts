import { Alumno } from './alumno';

export interface AlumnoState {
  loading: boolean;
  alumnos: Alumno[];
}
