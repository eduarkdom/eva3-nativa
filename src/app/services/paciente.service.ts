import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  public apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  agregarPaciente(paciente: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}paciente`, paciente).pipe(
      catchError(this.handleError)
    );
  }

  actualizarPaciente(id: string, paciente: any): Observable<any> {
    return this.http.put(`${this.apiUrl}paciente/${id}`, paciente);
  }

  eliminarPaciente(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}paciente/${id}`);
  }

  obtenerTodosLosPacientes(): Observable<any> {
    return this.http.get(`${this.apiUrl}pacientes`);
  }

  obtenerPacientePorId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}paciente/${id}`);
  }

  obtenerUltimosPacientes(cantidad: number): Observable<any> {
    return this.http.get(`${this.apiUrl}pacientes/${cantidad}`);
  }

  buscarPacientes(criterios: any): Observable<any> {
    return this.http.get(`${this.apiUrl}paciente/busqueda`, { params: criterios });
  }

  subirFotoPaciente(id: string, archivo: File): Observable<any> {
    const formData = new FormData();
    formData.append('archivo', archivo);
  
    return this.http.post(`${this.apiUrl}paciente/upload/${id}`, formData).pipe(
      catchError(this.handleError)
    );
  }

  obtenerFotoPaciente(filename: string): Observable<any> {
    return this.http.get(`${this.apiUrl}paciente/archivo/${filename}`, { responseType: 'blob' });
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.error('Error en la solicitud:', error);
    return throwError('Hubo un problema con la solicitud. Por favor, inténtalo de nuevo.');
  }
}