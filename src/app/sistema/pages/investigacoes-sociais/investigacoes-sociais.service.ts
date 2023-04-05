import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { InvestigacaoSocial, InvestigacoesSociais } from "./investigacoes-sociais";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class InvestigacoesSociaisService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<InvestigacoesSociais> {
      return this.http.get<InvestigacoesSociais>(`${API}/investigacoes-sociais`);
    }

    show(id: number): Observable<InvestigacaoSocial> {
      return this.http.get<InvestigacaoSocial>(`${API}/investigacoes-sociais/${id}`);
    }

    store(data: InvestigacaoSocial){
      return this.http.post(`${API}/investigacoes-sociais`,data);
    }
  
    update(data: InvestigacaoSocial){
      return this.http.put(`${API}/investigacoes-sociais/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/investigacoes-sociais/${id}`);
    }
}