import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from './shared/shared.module';
import { LoginService } from './services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

@NgModule({
  declarations: [DashboardComponent, LoginComponent],
  imports: [CommonModule, AppRoutingModule, SharedModule],
  providers: [
    LoginService,
    { provide: MatDialogRef, useValue: {} },
    HttpClientModule,
  ],
  exports: [AppRoutingModule, SharedModule],
})
export class CoreModule {}
