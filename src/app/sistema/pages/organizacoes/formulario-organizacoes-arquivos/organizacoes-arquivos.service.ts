import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { OrganizacaoArquivo, OrganizacoesArquivos } from "./organizacoes-arquivos";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class OrganizacoesArquivosService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<OrganizacoesArquivos> {
      return this.http.get<OrganizacoesArquivos>(`${API}/organizacoes-arquivos`);
    }

    show(id: number): Observable<OrganizacaoArquivo> {
      return this.http.get<OrganizacaoArquivo>(`${API}/organizacoes-arquivos/${id}`);
    }    
  
    store(data: OrganizacaoArquivo){
      return this.http.post(`${API}/organizacoes-arquivos`,data);
    }
  
    update(data: OrganizacaoArquivo){
      return this.http.put(`${API}/organizacoes-arquivos/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/organizacoes-arquivos/${id}`);
    }  
}