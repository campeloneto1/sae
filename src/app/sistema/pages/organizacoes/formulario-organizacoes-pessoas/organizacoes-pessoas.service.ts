import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { OrganizacaoPessoa, OrganizacoesPessoas } from "./organizacoes-pessoas";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class OrganizacoesPessoasService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<OrganizacoesPessoas> {
      return this.http.get<OrganizacoesPessoas>(`${API}/organizacoes-pessoas`);
    }

    show(id: number): Observable<OrganizacaoPessoa> {
      return this.http.get<OrganizacaoPessoa>(`${API}/organizacoes-pessoas/${id}`);
    }    
  
    store(data: OrganizacaoPessoa){
      return this.http.post(`${API}/organizacoes-pessoas`,data);
    }
  
    update(data: OrganizacaoPessoa){
      return this.http.put(`${API}/organizacoes-pessoas/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/organizacoes-pessoas/${id}`);
    }    
}