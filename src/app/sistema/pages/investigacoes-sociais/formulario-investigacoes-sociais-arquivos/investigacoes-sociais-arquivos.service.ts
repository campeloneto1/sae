import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { InvestigacaoSocialArquivo, InvestigacoesSociaisArquivos } from "./investigacoes-sociais-arquivos";

const API = environment.url;

@Injectable({providedIn: "root"})
export class InvestigacoesSociaisArquivosService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<InvestigacoesSociaisArquivos> {
      return this.http.get<InvestigacoesSociaisArquivos>(`${API}/investigacoes-sociais-arquivos`);
    }

    show(id: number): Observable<InvestigacaoSocialArquivo> {
      return this.http.get<InvestigacaoSocialArquivo>(`${API}/investigacoes-sociais-arquivos/${id}`);
    }    
  
    store(data: InvestigacaoSocialArquivo){
      return this.http.post(`${API}/investigacoes-sociais-arquivos`,data);
    }
  
    update(data: InvestigacaoSocialArquivo){
      return this.http.put(`${API}/investigacoes-sociais-arquivos/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/investigacoes-sociais-arquivos/${id}`);
    }  
}