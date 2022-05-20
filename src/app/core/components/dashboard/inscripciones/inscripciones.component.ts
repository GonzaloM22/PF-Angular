import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Inscripcion } from 'src/app/core/models/inscripcion';
import { InscripcionService } from 'src/app/core/services/inscripcion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/core/services/login.service';
import { AppState } from 'src/app/core/state/app.state';
import { Store } from '@ngrx/store';
import { cargarInscripciones } from 'src/app/core/state/actions/inscripcion.action';
import {
  selectorCargandoInscripciones,
  selectorListaInscripciones,
} from 'src/app/core/state/selectors/inscripcion.selector';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.css'],
})
export class InscripcionesComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('tabla') table?: MatTable<Inscripcion>;
  displayedColumns: string[] = ['alumno', 'curso', 'botones'];
  inscripciones$!: Observable<any>;
  inscripciones: Inscripcion[];
  subscription!: any;
  dataSource = new MatTableDataSource();
  esAdmin: boolean;
  loading!: boolean;

  constructor(
    private _snackBar: MatSnackBar,
    private _inscripcionService: InscripcionService,
    private _loginService: LoginService,
    private store: Store<AppState>
  ) {
    this.inscripciones = [];
    this.esAdmin = _loginService.esAdmin;
    this.loading = false;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.mostrarInscripciones();
    }, 100);
  }

  ngAfterViewInit() {
    this.mostrarInscripciones();
  }

  mostrarInscripciones() {
    this.store.dispatch(cargarInscripciones());

    setTimeout(() => {
      this.inscripciones$ = this.store.select(selectorListaInscripciones);
      this.loading = true;
    }, 500);
  }

  editarInscripcion(inscripcion: Inscripcion) {
    this._inscripcionService.inscripcionEditar = inscripcion;
  }

  eliminarInscripcion(id: number) {
    const confirmacion = confirm('Esta seguro que desea eliminar este curso?');

    if (confirmacion) {
      this._inscripcionService.eliminarInscripcion(id).subscribe();
      this.inscripciones = this.inscripciones.filter((i) => i.id != id);
      this.dataSource.data = this.inscripciones;
      this._snackBar.open('Inscripcion eliminado con exito', '', {
        duration: 2000,
      });
      this.mostrarInscripciones();
    }
    this.mostrarInscripciones();
  }

  ngOnDestroy(): void {
    //his.subscription.unsubscribe();
  }
}
