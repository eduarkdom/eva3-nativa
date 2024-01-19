import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';

@Component({
  selector: 'app-detalle-registro',
  templateUrl: './detalle-registro.component.html',
  styleUrls: ['./detalle-registro.component.css']
})
export class DetalleRegistroComponent implements OnInit {
  pacienteId: string = "";
  paciente: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pacienteService: PacienteService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pacienteId = params['id'];
      if (this.pacienteId) {
        this.obtenerDetallePaciente();
      }
    });
  }

  obtenerDetallePaciente() {
    this.pacienteService.obtenerPacientePorId(this.pacienteId).subscribe(
      (paciente: any) => {
        this.paciente = paciente;
      },
      (error: any) => {
        console.error('Error al obtener detalle del paciente:', error);
      }
    );
  }

  actualizarPaciente() {
    this.router.navigate(['/registro/actualizar', this.pacienteId]);
  }

  eliminarPaciente() {
    if (confirm('¿Está seguro de eliminar este registro?')) {
      this.pacienteService.eliminarPaciente(this.pacienteId).subscribe(
        () => {
          alert('Registro eliminado exitosamente.');
          this.router.navigate(['/registro/listar']);
        },
        (error: any) => {
          console.error('Error al eliminar el paciente:', error);
        }
      );
    }
  }
}
