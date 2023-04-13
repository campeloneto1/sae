import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { CgdsSituacoesTipos, CgdSituacaoTipo } from "./cgds-situacoes-tipos";


const API = environment.url;

@Injectable({providedIn: 'root'})
export class CgdsSituacoesTiposService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<CgdsSituacoesTipos> {
      return this.http.get<CgdsSituacoesTipos>(`${API}/cgds-situacoes-tipos`);
    }

    show(id: number): Observable<CgdSituacaoTipo> {
      return this.http.get<CgdSituacaoTipo>(`${API}/cgds-situacoes-tipos/${id}`);
    }
  
    store(data: CgdSituacaoTipo){
      return this.http.post(`${API}/cgds-situacoes-tipos`,data);
    }
  
    update(data: CgdSituacaoTipo){
      return this.http.put(`${API}/cgds-situacoes-tipos/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/cgds-situacoes-tipos/${id}`);
    }
}