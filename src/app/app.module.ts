import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SharedModule } from './core/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ROOT_REDUCERS } from './core/state/app.state';
import { EffectsModule } from '@ngrx/effects';
import { AlumnosEffects } from './core/state/effects/alumno.effects';
import { CursosEffects } from './core/state/effects/curso.effects';
import { InscripcionesEffects } from './core/state/effects/inscripcion.effects';
import { UsuariosEffects } from './core/state/effects/usuario.effects';

@NgModule({
  declarations: [AppComponent],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([
      AlumnosEffects,
      CursosEffects,
      InscripcionesEffects,
      UsuariosEffects,
    ]),
  ],
  providers: [HttpClientModule, HttpClient],
  exports: [SharedModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
