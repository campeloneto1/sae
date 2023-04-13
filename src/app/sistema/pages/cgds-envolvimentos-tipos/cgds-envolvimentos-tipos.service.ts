import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { CgdsEnvolvimentosTipos, CgdEnvolvimentoTipo } from "./cgds-envolvimentos-tipos";


const API = environment.url;

@Injectable({providedIn: 'root'})
export class CgdsEnvolvimentosTiposService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<CgdsEnvolvimentosTipos> {
      return this.http.get<CgdsEnvolvimentosTipos>(`${API}/cgds-envolvimentos-tipos`);
    }

    show(id: number): Observable<CgdEnvolvimentoTipo> {
      return this.http.get<CgdEnvolvimentoTipo>(`${API}/cgds-envolvimentos-tipos/${id}`);
    }
  
    store(data: CgdEnvolvimentoTipo){
      return this.http.post(`${API}/cgds-envolvimentos-tipos`,data);
    }
  
    update(data: CgdEnvolvimentoTipo){
      return this.http.put(`${API}/cgds-envolvimentos-tipos/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/cgds-envolvimentos-tipos/${id}`);
    }
}