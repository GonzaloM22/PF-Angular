import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { InscripcionService } from '../../services/inscripcion.service';

@Injectable()
export class InscripcionesEffects {
  loadInscripciones$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Listado de inscripciones] Cargar inscripciones'),
      mergeMap(() =>
        this._inscripcionService.obtenerInscripciones().pipe(
          map((inscripciones) => ({
            type: '[Listado de inscripciones] Inscripciones cargadas',
            inscripciones,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private _inscripcionService: InscripcionService
  ) {}
}
