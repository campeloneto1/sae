import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { SituacaoTipo, SituacoesTipos } from "./situacoes-tipos";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class SituacoesTiposService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<SituacoesTipos> {
      return this.http.get<SituacoesTipos>(`${API}/situacoes-tipos`);
    }

    show(id: number): Observable<SituacaoTipo> {
      return this.http.get<SituacaoTipo>(`${API}/situacoes-tipos/${id}`);
    }
  
    store(data: SituacaoTipo){
      return this.http.post(`${API}/situacoes-tipos`,data);
    }
  
    update(data: SituacaoTipo){
      return this.http.put(`${API}/situacoes-tipos/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/situacoes-tipos/${id}`);
    }
}