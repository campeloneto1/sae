import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { AnaliseVeiculo, AnalisesVeiculos } from "./analises-veiculos";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class AnalisesVeiculosService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<AnalisesVeiculos> {
      return this.http.get<AnalisesVeiculos>(`${API}/analises-veiculos`);
    }

    show(id: number): Observable<AnaliseVeiculo> {
      return this.http.get<AnaliseVeiculo>(`${API}/analises-veiculos/${id}`);
    }    
  
    store(data: AnaliseVeiculo){
      return this.http.post(`${API}/analises-veiculos`,data);
    }
  
    update(data: AnaliseVeiculo){
      return this.http.put(`${API}/analises-veiculos/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/analises-veiculos/${id}`);
    }   
}