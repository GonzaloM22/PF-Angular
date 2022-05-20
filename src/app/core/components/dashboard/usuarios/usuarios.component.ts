import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/core/models/usuario';
import { LoginService } from 'src/app/core/services/login.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { AppState } from 'src/app/core/state/app.state';
import { Store } from '@ngrx/store';
import { cargarUsuarios } from 'src/app/core/state/actions/usuario.action';
import {
  selectorCargandoUsuarios,
  selectorListaUsuarios,
} from 'src/app/core/state/selectors/usuario.selector';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'contraseña', 'rol', 'botones'];
  usuarios$: Observable<any>;
  usuarios: Usuario[] = [];
  subscription!: any;
  dataSource = new MatTableDataSource<Usuario>();
  esAdmin: boolean;
  loading: boolean;

  constructor(
    private _loginService: LoginService,
    private _usuarioService: UsuarioService,
    private _snackBar: MatSnackBar,
    private store: Store<AppState>
  ) {
    this.usuarios$ = new Observable();
    this.esAdmin = _loginService.esAdmin;
    this.loading = false;
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }
  ngAfterViewInit() {
    // viewChild is set after the view has been initialized
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.store.dispatch(cargarUsuarios());

    setTimeout(() => {
      this.usuarios$ = this.store.select(selectorListaUsuarios);
      this.loading = true;
    }, 500);
  }

  eliminarUsuario(id: number) {
    const confirmacion = confirm(
      'Esta seguro que desea eliminar este usuario?'
    );

    if (confirmacion) {
      this._usuarioService.eliminarUsuario(id).subscribe();
      this.usuarios = this.usuarios.filter((c) => c.id != id);
      this.dataSource.data = this.usuarios;
      this._snackBar.open('Usuario eliminado con exito', '', {
        duration: 2000,
      });
      this.obtenerUsuarios();
    }
    this.obtenerUsuarios();
  }

  editarUsuario(usuario: Usuario) {
    this._usuarioService.usuarioEditar = usuario;
  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }
}
