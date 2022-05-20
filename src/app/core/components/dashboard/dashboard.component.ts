import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  esAdmin: boolean;
  open: boolean = false;
  constructor(public dialog: MatDialog, private _loginService: LoginService) {
    this.esAdmin = _loginService.esAdmin;
  }
}
