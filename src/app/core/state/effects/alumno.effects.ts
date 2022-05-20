import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AlumnoService } from '../../services/alumno.service';

@Injectable()
export class AlumnosEffects {
  loadAlumnos$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Listado de alumnos] Cargar alumnos'),
      mergeMap(() =>
        this._alumnosService.obtenerAlumnos().pipe(
          map((alumnos) => ({
            type: '[Listado de alumnos] Alumnos cargados',
            alumnos,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private _alumnosService: AlumnoService
  ) {}
}
