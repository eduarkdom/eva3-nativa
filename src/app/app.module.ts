import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NuevoRegistroComponent } from './components/nuevo-registro/nuevo-registro.component';
import { ActualizarRegistroComponent } from './components/actualizar-registro/actualizar-registro.component';
import { DetalleRegistroComponent } from './components/detalle-registro/detalle-registro.component';
import { BuscarRegistroComponent } from './components/buscar-registro/buscar-registro.component';
import { BusquedaRegistroComponent } from './components/busqueda-registro/busqueda-registro.component';
import { ListarRegistroComponent } from './components/listar-registro/listar-registro.component';
import { ErrorComponent } from './components/error/error.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NuevoRegistroComponent,
    ActualizarRegistroComponent,
    DetalleRegistroComponent,
    BuscarRegistroComponent,
    BusquedaRegistroComponent,
    ListarRegistroComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
