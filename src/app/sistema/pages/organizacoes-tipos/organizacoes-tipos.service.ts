import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { OrganizacaoTipo, OrganizacoesTipos } from "./organizacoes-tipos";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class OrganizacoesTiposService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<OrganizacoesTipos> {
      return this.http.get<OrganizacoesTipos>(`${API}/organizacoes-tipos`);
    }

    show(id: number): Observable<OrganizacaoTipo> {
      return this.http.get<OrganizacaoTipo>(`${API}/organizacoes-tipos/${id}`);
    }
  
    store(data: OrganizacaoTipo){
      return this.http.post(`${API}/organizacoes-tipos`,data);
    }
  
    update(data: OrganizacaoTipo){
      return this.http.put(`${API}/organizacoes-tipos/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/organizacoes-tipos/${id}`);
    }
}