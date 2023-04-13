import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { CgdsProcessosTipos, CgdProcessoTipo } from "./cgds-processos-tipos";


const API = environment.url;

@Injectable({providedIn: 'root'})
export class CgdsProcessosTiposService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<CgdsProcessosTipos> {
      return this.http.get<CgdsProcessosTipos>(`${API}/cgds-processos-tipos`);
    }

    show(id: number): Observable<CgdProcessoTipo> {
      return this.http.get<CgdProcessoTipo>(`${API}/cgds-processos-tipos/${id}`);
    }
  
    store(data: CgdProcessoTipo){
      return this.http.post(`${API}/cgds-processos-tipos`,data);
    }
  
    update(data: CgdProcessoTipo){
      return this.http.put(`${API}/cgds-processos-tipos/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/cgds-processos-tipos/${id}`);
    }
}