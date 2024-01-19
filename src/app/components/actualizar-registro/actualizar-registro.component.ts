import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';

@Component({
  selector: 'app-actualizar-registro',
  templateUrl: './actualizar-registro.component.html',
  styleUrls: ['./actualizar-registro.component.css']
})
export class ActualizarRegistroComponent implements OnInit {
  pacienteId: string = "";
  paciente: any = {};
  fotoSeleccionada: File | null = null;

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
    if (!this.validarDatos()) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    this.pacienteService.actualizarPaciente(this.pacienteId, this.paciente).subscribe(
      () => {
        if (this.fotoSeleccionada) {
          this.subirFoto();
        } else {
          alert('Registro actualizado exitosamente.');
          this.router.navigate(['/registro/listar']);
        }
      },
      (error: any) => {
        console.error('Error al actualizar el paciente:', error);
        alert('Error al actualizar el paciente. Inténtelo de nuevo.');
      }
    );
  }

  seleccionarFoto(event: any) {
    this.fotoSeleccionada = event.target.files[0];
  }

  subirFoto() {
    if (this.fotoSeleccionada) {
      this.pacienteService.subirFotoPaciente(this.pacienteId, this.fotoSeleccionada).subscribe(
        () => {
          alert('Registro actualizado exitosamente.');
          this.router.navigate(['/registro/listar']);
        },
        (error: any) => {
          console.error('Error al subir la foto del paciente:', error);
          alert('Error al subir la foto del paciente. Inténtelo de nuevo.');
        }
      );
    }
  }

  private validarDatos(): boolean {
    return (
      this.paciente.rut?.trim().length > 0 &&
      this.paciente.nombre?.trim().length > 0 &&
      typeof this.paciente.edad === 'number' &&
      this.paciente.sexo?.trim().length > 0 &&
      this.paciente.enfermedad?.trim().length > 0
    );
  }
}
