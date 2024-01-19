// buscar-registro.component.ts

import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';

@Component({
  selector: 'app-buscar-registro',
  templateUrl: './buscar-registro.component.html',
  styleUrls: ['./buscar-registro.component.css']
})
export class BuscarRegistroComponent {
  criterios: any = {
    parametro: 'sexo',
    valor: ''
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
