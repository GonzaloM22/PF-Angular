import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { Alumno } from '../../../models/alumno';
import { AlumnoService } from '../../../services/alumno.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { observable, Observable } from 'rxjs';
import { LoginService } from 'src/app/core/services/login.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppState } from 'src/app/core/state/app.state';
import { Store } from '@ngrx/store';
import {
  alumnosCargados,
  cargarAlumnos,
} from 'src/app/core/state/actions/alumno.action';
import {
  selectorCargandoAlumnos,
  selectorListaAlumnos,
} from 'src/app/core/state/selectors/alumno.selector';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css'],
})
export class AlumnosComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tabla') table?: MatTable<any>;
  displayedColumns: string[] = [
    'nombre',
    'edad',
    'sexo',
    'legajo',
    'email',
    'observaciones',
    'botones',
  ];
  listAlumnos: Alumno[];
  alumnos$!: Observable<any>;
  subscription!: any;
  name: string;
  mostrar: boolean = false;
  accion: String = '';
  dataSource = new MatTableDataSource();
  esAdmin: boolean;
  loading!: boolean;

  constructor(
    private _alumnoService: AlumnoService,
    private store: Store<AppState>,
    private _loginService: LoginService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.name = 'Mostrar';
    this.listAlumnos = [];
    this.esAdmin = _loginService.esAdmin;
    this.loading = false;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.mostrarListado();
    }, 100);
  }

  ngAfterViewInit() {
    // viewChild is set after the view has been initialized
    this.mostrarListado();
  }

  mostrarListado() {
    this.store.dispatch(cargarAlumnos());
    setTimeout(() => {
      this.alumnos$ = this.store.select(selectorListaAlumnos);
      this.loading = true;
    }, 500);
  }

  eliminarAlumno(id: number) {
    const confirmacion = confirm('Esta seguro que desea eliminar este alumno?');

    if (confirmacion) {
      this._alumnoService.eliminarAlumno(id).subscribe();
      this.listAlumnos = this.listAlumnos.filter((a) => a.id != id);
      this.dataSource.data = this.listAlumnos;

      this._snackBar.open('Alumno eliminado con exito', '', {
        duration: 2000,
      });
      this.mostrarListado();
    }
    this.mostrarListado();
  }

  editarAlumno(alumno: Alumno) {
    this._alumnoService.alumnoEditar = alumno;
  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }
}
