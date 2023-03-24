import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { PessoaVeiculo, PessoasVeiculos } from "./pessoas-veiculos";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class PessoasVeiculosService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<PessoasVeiculos> {
      return this.http.get<PessoasVeiculos>(`${API}/pessoas-veiculos`);
    }

    show(id: number): Observable<PessoaVeiculo> {
      return this.http.get<PessoaVeiculo>(`${API}/pessoas-veiculos/${id}`);
    }    
  
    store(data: PessoaVeiculo){
      return this.http.post(`${API}/pessoas-veiculos`,data);
    }
  
    update(data: PessoaVeiculo){
      return this.http.put(`${API}/pessoas-veiculos/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/pessoas-veiculos/${id}`);
    }

    checkCpf(id: number) {
      return this.http.get(`${API}/pessoas-veiculos/${id}/checkCpf`);
    } 
}