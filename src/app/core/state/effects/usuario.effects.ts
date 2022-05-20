import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';

@Injectable()
export class UsuariosEffects {
  loadUsuarios$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Listado de usuarios] Cargar usuarios'),
      mergeMap(() =>
        this._usuarioService.obtenerUsuarios().pipe(
          map((usuarios) => ({
            type: '[Listado de usuarios] Usuarios cargados',
            usuarios,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private _usuarioService: UsuarioService
  ) {}
}
