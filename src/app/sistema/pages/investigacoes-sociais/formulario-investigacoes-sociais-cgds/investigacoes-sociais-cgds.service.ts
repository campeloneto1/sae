import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { InvestigacaoSocialCgd, InvestigacoesSociaisCgds } from "./investigacoes-sociais-cgds";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class InvestigacoesSociaisCgdsService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<InvestigacoesSociaisCgds> {
      return this.http.get<InvestigacoesSociaisCgds>(`${API}/investigacoes-sociais-cgds`);
    }

    show(id: number): Observable<InvestigacaoSocialCgd> {
      return this.http.get<InvestigacaoSocialCgd>(`${API}/investigacoes-sociais-cgds/${id}`);
    }

    store(data: InvestigacaoSocialCgd){
      return this.http.post(`${API}/investigacoes-sociais-cgds`,data);
    }
  
    update(data: InvestigacaoSocialCgd){
      return this.http.put(`${API}/investigacoes-sociais-cgds/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/investigacoes-sociais-cgds/${id}`);
    }
}