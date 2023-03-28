import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { Organizacao, Organizacoes } from "./organizacoes";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class OrganizacoesService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<Organizacoes> {
      return this.http.get<Organizacoes>(`${API}/organizacoes`);
    }

    show(id: number): Observable<Organizacao> {
      return this.http.get<Organizacao>(`${API}/organizacoes/${id}`);
    }
  
    store(data: Organizacao){
      return this.http.post(`${API}/organizacoes`,data);
    }
  
    update(data: Organizacao){
      return this.http.put(`${API}/organizacoes/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/organizacoes/${id}`);
    }
}