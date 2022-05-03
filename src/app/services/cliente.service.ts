import { Cliente } from '../Models/cliente';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private http: HttpClient) {}

  findById(id: any): Observable<Cliente> {
    return this.http.get<Cliente>(`${API_CONFIG.baseUrl}/cliente/${id}`);
  }

  findAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${API_CONFIG.baseUrl}/cliente`);
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${API_CONFIG.baseUrl}/cliente`, cliente);
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(
      `${API_CONFIG.baseUrl}/clientes/${cliente.id}`,
      cliente
    );
  }

  delete(id: any): Observable<Cliente> {
    return this.http.delete<Cliente>(`${API_CONFIG.baseUrl}/cliente/${id}`);
  }
}
