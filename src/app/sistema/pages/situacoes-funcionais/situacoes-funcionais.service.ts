import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { SituacaoFuncional, SituacoesFuncionais } from "./situacoes-funcionais";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class SituacoesFuncionaisService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<SituacoesFuncionais> {
      return this.http.get<SituacoesFuncionais>(`${API}/situacoes-funcionais`);
    }

    show(id: number): Observable<SituacaoFuncional> {
      return this.http.get<SituacaoFuncional>(`${API}/situacoes-funcionais/${id}`);
    }
  
    store(data: SituacaoFuncional){
      return this.http.post(`${API}/situacoes-funcionais`,data);
    }
  
    update(data: SituacaoFuncional){
      return this.http.put(`${API}/situacoes-funcionais/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/situacoes-funcionais/${id}`);
    }
}