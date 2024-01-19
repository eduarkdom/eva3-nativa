
import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../../services/paciente.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ultimosPacientes: any[] = [];

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.cargarUltimosPacientes();
  }

  cargarUltimosPacientes() {
    this.pacienteService.obtenerUltimosPacientes(5).subscribe(
      (result: any) => {
        this.ultimosPacientes = result.patients;
      },
      (error: any) => {
        console.error('Error al obtener últimos pacientes:', error);
      }
    );
  }
}
