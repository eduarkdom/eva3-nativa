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
    return this.http.put(`${this.apiUrl}paciente/${id}`, paciente).pipe(
      catchError(this.handleError)
    );
  }

  eliminarPaciente(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}paciente/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  obtenerTodosLosPacientes(): Observable<any> {
    return this.http.get(`${this.apiUrl}pacientes`).pipe(
      catchError(this.handleError)
    );
  }

  obtenerPacientePorId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}paciente/id/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  obtenerUltimosPacientes(cantidad: number): Observable<any> {
    return this.http.get(`${this.apiUrl}pacientes/${cantidad}`).pipe(
      catchError(this.handleError)
    );
  }

  buscarPacientes(criterios: any): Observable<any> {
    return this.http.get(`${this.apiUrl}paciente/busqueda`, { params: criterios }).pipe(
      catchError(this.handleError)
    );
  }

  subirFotoPaciente(id: string | null, archivo: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', archivo);

    const url = id ? `${this.apiUrl}paciente/upload/${id}` : `${this.apiUrl}paciente/upload`;

    return this.http.post(url, formData).pipe(
        catchError(this.handleError)
    );
}

  
  convertirArchivoABase64Sync(file: File): string {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return reader.result as string;
  }
  
  

  obtenerFotoPaciente(filename: string): Observable<any> {
    return this.http.get(`${this.apiUrl}paciente/archivo/${filename}`, { responseType: 'blob' }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    let errorMessage = 'Hubo un problema con la solicitud. Por favor, inténtalo de nuevo.';

    if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
    } else if (error.status) {
        errorMessage = `Código de error: ${error.status}\nMensaje: ${JSON.stringify(error.error)}`;
    }

    console.error(errorMessage);

    

    return throwError(errorMessage);
  }
}
