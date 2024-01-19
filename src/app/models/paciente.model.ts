export interface Paciente {
  rut: string;
  nombre: string;
  edad: number;
  sexo: string;
  enfermedad: string;
  fechaIngreso?: Date;
  fotoPersonal?: String;
  revisado: boolean;
}