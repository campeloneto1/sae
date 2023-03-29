import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { OrganizacaoVeiculo, OrganizacoesVeiculos } from "./organizacoes-veiculos";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class OrganizacoesVeiculosService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<OrganizacoesVeiculos> {
      return this.http.get<OrganizacoesVeiculos>(`${API}/organizacoes-veiculos`);
    }

    show(id: number): Observable<OrganizacaoVeiculo> {
      return this.http.get<OrganizacaoVeiculo>(`${API}/organizacoes-veiculos/${id}`);
    }    
  
    store(data: OrganizacaoVeiculo){
      return this.http.post(`${API}/organizacoes-veiculos`,data);
    }
  
    update(data: OrganizacaoVeiculo){
      return this.http.put(`${API}/organizacoes-veiculos/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/organizacoes-veiculos/${id}`);
    }    
}