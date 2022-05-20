import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formUsuario: FormGroup;

  constructor(
    private _serviceLogin: LoginService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.formUsuario = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  ingresar() {
    this._serviceLogin
      .obtenerUsuarios(
        this.formUsuario.value.usuario,
        this.formUsuario.value.password
      )
      .subscribe((res) => {
        if (res.length == 1) {
          this._serviceLogin.sesionActiva = true;
          this._serviceLogin.esAdmin = res[0].esAdmin;
          this.router.navigate(['dashboard']);
        } else {
          this._snackBar.open('Usuario o contraseña invalidos', '', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        }
      });
  }
}
