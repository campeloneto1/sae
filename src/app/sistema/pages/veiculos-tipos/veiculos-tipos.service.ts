import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { VeiculoTipo, VeiculosTipos } from "./veiculos-tipos";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class VeiculosTiposService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<VeiculosTipos> {
      return this.http.get<VeiculosTipos>(`${API}/veiculos-tipos`);
    }

    show(id: number): Observable<VeiculoTipo> {
      return this.http.get<VeiculoTipo>(`${API}/veiculos-tipos/${id}`);
    }
  
    store(data: VeiculoTipo){
      return this.http.post(`${API}/veiculos-tipos`,data);
    }
  
    update(data: VeiculoTipo){
      return this.http.put(`${API}/veiculos-tipos/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/veiculos-tipos/${id}`);
    }
}