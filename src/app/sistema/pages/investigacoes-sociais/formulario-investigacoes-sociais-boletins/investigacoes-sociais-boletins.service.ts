import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { InvestigacaoSocialBoletim, InvestigacoesSociaisBoletins } from "./investigacoes-sociais-boletins";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class InvestigacoesSociaisBoletinsService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<InvestigacoesSociaisBoletins> {
      return this.http.get<InvestigacoesSociaisBoletins>(`${API}/investigacoes-sociais-boletins`);
    }

    show(id: number): Observable<InvestigacaoSocialBoletim> {
      return this.http.get<InvestigacaoSocialBoletim>(`${API}/investigacoes-sociais-boletins/${id}`);
    }

    store(data: InvestigacaoSocialBoletim){
      return this.http.post(`${API}/investigacoes-sociais-boletins`,data);
    }
  
    update(data: InvestigacaoSocialBoletim){
      return this.http.put(`${API}/investigacoes-sociais-boletins/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/investigacoes-sociais-boletins/${id}`);
    }
}