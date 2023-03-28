import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { AnalisePessoa, AnalisesPessoas } from "./analises-pessoas";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class AnalisesPessoasService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<AnalisesPessoas> {
      return this.http.get<AnalisesPessoas>(`${API}/analises-pessoas`);
    }

    show(id: number): Observable<AnalisePessoa> {
      return this.http.get<AnalisePessoa>(`${API}/analises-pessoas/${id}`);
    }    
  
    store(data: AnalisePessoa){
      return this.http.post(`${API}/analises-pessoas`,data);
    }
  
    update(data: AnalisePessoa){
      return this.http.put(`${API}/analises-pessoas/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/analises-pessoas/${id}`);
    }    
}