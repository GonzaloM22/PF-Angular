import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private readonly URL_API =
    'http://6269f3f7737b438c1c3fbfe2.mockapi.io/cursos/';
  cursoEditar?: Curso;

  constructor(private http: HttpClient) {}

  obtenerCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.URL_API);
  }

  agregarCurso(curso: Curso) {
    return this.http.post<Curso>(this.URL_API, curso);
  }

  eliminarCurso(id: number) {
    return this.http.delete(`${this.URL_API}/${id}`);
  }

  editarAlumno(curso: Curso) {
    this.cursoEditar = curso;

    return this.http.put<Curso>(`${this.URL_API}/${curso.id}`, curso);
  }
}
