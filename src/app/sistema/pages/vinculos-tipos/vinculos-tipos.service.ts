import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { VinculoTipo, VinculosTipos } from "./vinculos-tipos";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class VinculosTiposService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<VinculosTipos> {
      return this.http.get<VinculosTipos>(`${API}/vinculos-tipos`);
    }

    show(id: number): Observable<VinculoTipo> {
      return this.http.get<VinculoTipo>(`${API}/vinculos-tipos/${id}`);
    }
  
    store(data: VinculoTipo){
      return this.http.post(`${API}/vinculos-tipos`,data);
    }
  
    update(data: VinculoTipo){
      return this.http.put(`${API}/vinculos-tipos/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/vinculos-tipos/${id}`);
    }
}