import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { InvestigacaoSocialLotacao, InvestigacoesSociaisLotacoes } from "./investigacoes-sociais-lotacoes";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class InvestigacoesSociaisLotacoesService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<InvestigacoesSociaisLotacoes> {
      return this.http.get<InvestigacoesSociaisLotacoes>(`${API}/investigacoes-sociais-lotacoes`);
    }

    show(id: number): Observable<InvestigacaoSocialLotacao> {
      return this.http.get<InvestigacaoSocialLotacao>(`${API}/investigacoes-sociais-lotacoes/${id}`);
    }

    store(data: InvestigacaoSocialLotacao){
      return this.http.post(`${API}/investigacoes-sociais-lotacoes`,data);
    }
  
    update(data: InvestigacaoSocialLotacao){
      return this.http.put(`${API}/investigacoes-sociais-lotacoes/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/investigacoes-sociais-lotacoes/${id}`);
    }
}