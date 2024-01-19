// En tu archivo nuevo-registro.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-nuevo-registro',
  templateUrl: './nuevo-registro.component.html',
  styleUrls: ['./nuevo-registro.component.css']
})
export class NuevoRegistroComponent implements OnInit {
  paciente: any = {};
  
  errorMessage: string = '';

  imagenPorDefectoURL = 'https://img.freepik.com/vector-premium/icono-perfil-usuario-estilo-plano-ilustracion-vector-avatar-miembro-sobre-fondo-aislado-concepto-negocio-signo-permiso-humano_157943-15752.jpg'

  constructor(private pacienteService: PacienteService, private router: Router) {}

  ngOnInit(): void {}

  agregarPaciente() {
    if (!this.validateForm()) {
      return;
    }

    this.pacienteService.agregarPaciente(this.paciente).subscribe(
      (response) => {
        console.log('Paciente agregado correctamente:', response);
        alert('Paciente agregado correctamente');
        this.router.navigate(['/registro/listar']);
      },
      (error) => {
        console.error('Error al agregar paciente:', error);
        this.errorMessage = 'Error al agregar paciente. Por favor, verifica los datos e intenta nuevamente.';
        alert(this.errorMessage);
      }
    );
  }

  handleFileInput(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.paciente.fotoPersonal = file;
    }
  }


  

  private validateForm(): boolean {
    const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/;

    const validationErrors = [];

    if (!this.paciente.rut || !rutRegex.test(this.paciente.rut)) {
      validationErrors.push('El campo Rut es obligatorio y debe tener puntos y guion.');
    }

    if (!this.paciente.nombre) {
      validationErrors.push('El campo Nombre es obligatorio.');
    }

    if (!this.paciente.edad || isNaN(this.paciente.edad) || this.paciente.edad <= 0) {
      validationErrors.push('El campo Edad es obligatorio y debe ser un número mayor a cero.');
    }

    if (!this.paciente.sexo) {
      validationErrors.push('El campo Sexo es obligatorio.');
    }

    if (!this.paciente.enfermedad) {
      validationErrors.push('El campo Enfermedad es obligatorio.');
    }

    if (validationErrors.length > 0) {
      const errorMessage = validationErrors.join('\n');
      alert(errorMessage);
      return false;
    }

    return true;
  }

   public getImagenURL(): string {
    return this.paciente.fotoPersonal ? 
      URL.createObjectURL(this.paciente.fotoPersonal) : 
      this.imagenPorDefectoURL;
  }


}
