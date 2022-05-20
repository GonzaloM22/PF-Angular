import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/core/models/usuario';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
})
export class CrearUsuarioComponent implements OnInit {
  formUsuarios: FormGroup;
  usuarioEditar?: Usuario;
  titulo: string;
  boton: string;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _usuarioService: UsuarioService,
    private router: Router
  ) {
    this.formUsuarios = this.fb.group({
      id: [''],
      nombre: ['', [Validators.required, Validators.min(3)]],
      clave: ['', [Validators.required, Validators.min(4)]],
      esAdmin: ['', [Validators.required]],
    });

    this.titulo = 'Nuevo';
    this.boton = 'Agregar';
  }

  ngOnInit(): void {
    this.editarUsuario();
  }

  agregarUsuario() {
    if (!this._usuarioService.usuarioEditar) {
      this._usuarioService.agregarUsuario(this.formUsuarios.value).subscribe();

      this.formUsuarios.reset();

      this._snackBar.open('Curso guardado con exito', '', {
        duration: 2000,
      });
      this.router.navigate(['dashboard', 'usuarios']);
    } else {
      this._usuarioService.editarUsuario(this.formUsuarios.value).subscribe();

      this.formUsuarios.reset();

      this._snackBar.open('Usuario editado con exito', '', {
        duration: 2000,
      });

      this._usuarioService.usuarioEditar = undefined;
      this.router.navigate(['dashboard', 'usuarios']);
    }
  }

  editarUsuario() {
    this.usuarioEditar = this._usuarioService.usuarioEditar;

    if (this.usuarioEditar) {
      this.titulo = 'Editar';
      this.boton = 'Editar';

      this.formUsuarios.setValue({
        id: this.usuarioEditar.id,
        nombre: this.usuarioEditar.nombre,
        clave: this.usuarioEditar.clave,
        esAdmin: this.usuarioEditar.esAdmin,
      });
    }
  }
}
