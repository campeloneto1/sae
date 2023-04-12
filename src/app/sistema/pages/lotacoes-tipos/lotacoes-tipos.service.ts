import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { LotacaoTipo, LotacoesTipos } from "./lotacoes-tipos";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class LotacoesTiposService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<LotacoesTipos> {
      return this.http.get<LotacoesTipos>(`${API}/lotacoes-tipos`);
    }

    show(id: number): Observable<LotacaoTipo> {
      return this.http.get<LotacaoTipo>(`${API}/lotacoes-tipos/${id}`);
    }
  
    store(data: LotacaoTipo){
      return this.http.post(`${API}/lotacoes-tipos`,data);
    }
  
    update(data: LotacaoTipo){
      return this.http.put(`${API}/lotacoes-tipos/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/lotacoes-tipos/${id}`);
    }
}