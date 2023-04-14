import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { InvestigacaoSocialStatus, InvestigacoesSociaisStatus } from "./investigacoes-sociais-status";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class InvestigacoesSociaisStatusService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<InvestigacoesSociaisStatus> {
      return this.http.get<InvestigacoesSociaisStatus>(`${API}/investigacoes-sociais-status`);
    }

    show(id: number): Observable<InvestigacaoSocialStatus> {
      return this.http.get<InvestigacaoSocialStatus>(`${API}/investigacoes-sociais-status/${id}`);
    }

    store(data: InvestigacaoSocialStatus){
      return this.http.post(`${API}/investigacoes-sociais-status`,data);
    }
  
    update(data: InvestigacaoSocialStatus){
      return this.http.put(`${API}/investigacoes-sociais-status/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/investigacoes-sociais-status/${id}`);
    }
}