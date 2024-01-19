// En el archivo listar-registro.component.ts
import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../../services/paciente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-registro',
  templateUrl: './listar-registro.component.html',
  styleUrls: ['./listar-registro.component.css']
})
export class ListarRegistroComponent implements OnInit {
  pacientes: any[] = [];

  constructor(private pacienteService: PacienteService, private router: Router) {}

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes() {
    this.pacienteService.obtenerTodosLosPacientes().subscribe(
      (result: any) => {
        this.pacientes = result.patients;
      },
      (error: any) => {
        console.error('Error al obtener pacientes:', error);
      }
    );
  }

  eliminarPaciente(id: string) {
    if (confirm('¿Estás seguro de eliminar este paciente?')) {
      this.pacienteService.eliminarPaciente(id).subscribe(
        () => {
          
          this.cargarPacientes();
        },
        (error: any) => {
          console.error('Error al eliminar paciente:', error);
        }
      );
    }
  }

  actualizarPaciente(id: string) {
    this.router.navigate(['/registro/actualizar', id]);
  }
  
}
