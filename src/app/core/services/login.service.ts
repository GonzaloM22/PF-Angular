import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Usuario } from 'src/app/core/models/usuario';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly URL_API =
    'https://6269f3f7737b438c1c3fbfe2.mockapi.io/usuarios/';

  sesionActiva: boolean;
  esAdmin!: boolean;

  constructor(private http: HttpClient) {
    this.sesionActiva = false;
  }

  obtenerUsuarios(nombre: string, contraseña: any) {
    return this.http.get<Usuario[]>(this.URL_API).pipe(
      map((usuarios) =>
        usuarios.filter((usuario) => {
          return usuario.nombre == nombre && usuario.clave == contraseña;
        })
      )
    );
  }
}
