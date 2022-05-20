import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly URL_API =
    'https://6269f3f7737b438c1c3fbfe2.mockapi.io/usuarios/';
  usuarioEditar?: Usuario;

  constructor(private http: HttpClient) {}

  obtenerUsuarios() {
    return this.http.get<Usuario[]>(this.URL_API);
  }

  agregarUsuario(usuario: Usuario) {
    console.log(usuario);
    return this.http.post<Usuario>(this.URL_API, usuario);
  }

  eliminarUsuario(id: number) {
    return this.http.delete(`${this.URL_API}/${id}`);
  }

  editarUsuario(usuario: Usuario) {
    this.usuarioEditar = usuario;

    return this.http.put<Usuario>(`${this.URL_API}/${usuario.id}`, usuario);
  }
}
