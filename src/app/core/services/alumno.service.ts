import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root',
})
export class AlumnoService {
  private readonly URL_API =
    'http://6269f3f7737b438c1c3fbfe2.mockapi.io/alumnos/';
  alumnoEditar?: Alumno;

  constructor(private http: HttpClient) {}

  obtenerAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.URL_API);
  }

  agregarAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(this.URL_API, alumno);
  }

  eliminarAlumno(id: number) {
    return this.http.delete(`${this.URL_API}/${id}`);
  }

  editarAlumno(alumno: Alumno) {
    return this.http.put<Alumno>(`${this.URL_API}/${alumno.id}`, alumno);
  }
}
