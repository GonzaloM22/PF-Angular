import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../models/curso';
import { LoginService } from 'src/app/core/services/login.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state/app.state';
import { cargarCursos } from 'src/app/core/state/actions/curso.action';
import {
  selectorCargandoCursos,
  selectorListaCursos,
} from 'src/app/core/state/selectors/curso.selector';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
})
export class CursosComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tabla') table?: MatTable<Curso>;
  displayedColumns: string[] = [
    'nombre',
    'descripcion',
    'fechaInicio',
    'duracion',
    'precio',
    'botones',
  ];
  cursos$!: Observable<any>;
  cursos: Curso[] = [];
  subscription!: any;
  dataSource = new MatTableDataSource();
  esAdmin: boolean;
  loading!: boolean;

  constructor(
    private _cursoService: CursoService,
    private _snackBar: MatSnackBar,
    private _loginService: LoginService,
    private store: Store<AppState>
  ) {
    this.esAdmin = _loginService.esAdmin;
    this.loading = false;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.obtenerCursos();
    }, 100);
  }

  ngAfterViewInit() {
    // viewChild is set after the view has been initialized
    this.obtenerCursos();
  }

  obtenerCursos() {
    this.store.dispatch(cargarCursos());
    setTimeout(() => {
      this.cursos$ = this.store.select(selectorListaCursos);
      this.loading = true;
    }, 500);
  }

  eliminarCurso(id: number) {
    const confirmacion = confirm('Esta seguro que desea eliminar este curso?');

    if (confirmacion) {
      this._cursoService.eliminarCurso(id).subscribe();
      this.cursos = this.cursos.filter((c) => c.id != id);
      this.dataSource.data = this.cursos;
      this._snackBar.open('Curso eliminado con exito', '', {
        duration: 2000,
      });
      this.obtenerCursos();
    }
    this.obtenerCursos();
  }

  editarCurso(curso: Curso) {
    this._cursoService.cursoEditar = curso;
  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }
}
