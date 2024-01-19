import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NuevoRegistroComponent } from './components/nuevo-registro/nuevo-registro.component';
import { ActualizarRegistroComponent } from './components/actualizar-registro/actualizar-registro.component';
import { DetalleRegistroComponent } from './components/detalle-registro/detalle-registro.component';
import { BuscarRegistroComponent } from './components/buscar-registro/buscar-registro.component';
import { BusquedaRegistroComponent } from './components/busqueda-registro/busqueda-registro.component';
import { ListarRegistroComponent } from './components/listar-registro/listar-registro.component';
import { ErrorComponent } from './components/error/error.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'registro/nuevo', component: NuevoRegistroComponent },
  { path: 'registro/actualizar/:id', component: ActualizarRegistroComponent },
  { path: 'registro/detalle/:id', component: DetalleRegistroComponent },
  { path: 'registro/buscar', component: BuscarRegistroComponent },
  { path: 'registro/busqueda/:search', component: BusquedaRegistroComponent },
  { path: 'registro/listar', component: ListarRegistroComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
