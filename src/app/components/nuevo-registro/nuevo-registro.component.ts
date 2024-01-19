import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-nuevo-registro',
  templateUrl: './nuevo-registro.component.html',
  styleUrls: ['./nuevo-registro.component.css']
})
export class NuevoRegistroComponent {
  paciente: any = {
    rut: '',
    nombre: '',
    edad: null,
    sexo: '',
    fotoPersonal: '',
    fechaIngreso: new Date(),
    enfermedad: '',
    revisado: false
  };

  fileError: string | null = null;
  selectedFile: File | null = null;

  constructor(private pacienteService: PacienteService, private router: Router) {}

  agregarPaciente() {
    if (!this.validateForm()) {
      return;
    }

    if (this.selectedFile) {
      this.pacienteService.subirFotoPaciente(this.paciente.rut, this.selectedFile).subscribe(
        () => {
          this.agregarPacienteInfo();
        },
        (error) => {
          console.error('Error al subir la foto:', error);
          alert('Error al agregar la foto del paciente');
        }
      );
    } else {
      this.agregarPacienteInfo();
    }
  }

  private agregarPacienteInfo() {
    this.pacienteService.agregarPaciente(this.paciente).subscribe(
      () => {
        this.router.navigate(['/']);
        alert('Paciente agregado con éxito');
      },
      (error) => {
        console.error('Error al agregar el paciente:', error);
        if (error && error.error && error.error.message) {
          alert(error.error.message);
        } else {
          alert('Error al agregar el paciente. Por favor, inténtalo de nuevo.');
        }
      }
    );
  }

  handleFileInput(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024);

      if (fileSizeInMB > 20) {
        this.fileError = 'El tamaño del archivo no puede ser mayor a 20 MB.';
        this.selectedFile = null;
        return;
      } else {
        this.fileError = null;
        this.selectedFile = file;
      }
    }
  }

  private validateForm(): boolean {
    return !!this.paciente.rut && !!this.paciente.nombre && this.paciente.edad > 0 &&
           !!this.paciente.sexo && !!this.paciente.enfermedad;
  }
}
