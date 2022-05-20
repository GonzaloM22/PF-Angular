import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inscripcion } from '../models/inscripcion';

@Injectable({
  providedIn: 'root',
})
export class InscripcionService {
  private readonly URL_API =
    'https://6269f3f7737b438c1c3fbfe2.mockapi.io/inscripciones/';

  inscripcionEditar?: Inscripcion;

  constructor(private http: HttpClient) {}

  obtenerInscripciones(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(this.URL_API);
  }

  agregarInscripcion(inscripcion: Inscripcion) {
    return this.http.post<Inscripcion>(this.URL_API, inscripcion);
  }

  eliminarInscripcion(id: number) {
    return this.http.delete(`${this.URL_API}/${id}`);
  }

  editarInscripcion(inscripcion: Inscripcion) {
    this.inscripcionEditar = inscripcion;

    return this.http.put<Inscripcion>(
      `${this.URL_API}/${inscripcion.id}`,
      inscripcion
    );
  }
}
