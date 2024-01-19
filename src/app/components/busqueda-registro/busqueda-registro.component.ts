import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';

@Component({
  selector: 'app-busqueda-registro',
  templateUrl: './busqueda-registro.component.html',
  styleUrls: ['./busqueda-registro.component.css']
})
export class BusquedaRegistroComponent {
  criterios: any = {
    sexo: '',
    fechaIngreso: '',
    enfermedad: ''
  };

  pacientes: any[] = [];

  constructor(private pacienteService: PacienteService, private router: Router, private route: ActivatedRoute) {}

  buscarPacientes() {
    this.pacienteService.buscarPacientes(this.criterios).subscribe(
      (result: any) => {
        this.pacientes = result.patients;
      },
      (error: any) => {
        console.error('Error al buscar pacientes:', error);
      }
    );
  }
}
