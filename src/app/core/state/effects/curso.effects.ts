import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { CursoService } from '../../services/curso.service';

@Injectable()
export class CursosEffects {
  loadCursos$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Listado de cursos] Cargar cursos'),
      mergeMap(() =>
        this._cursosService.obtenerCursos().pipe(
          map((cursos) => ({
            type: '[Listado de cursos] Cursos cargados',
            cursos,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private _cursosService: CursoService
  ) {}
}
