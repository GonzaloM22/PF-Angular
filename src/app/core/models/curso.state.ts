import { Curso } from './curso';

export interface CursoState {
  loading: boolean;
  cursos: Curso[];
}
