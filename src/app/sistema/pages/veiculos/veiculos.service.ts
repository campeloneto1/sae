import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { Veiculo, Veiculos } from "./veiculos";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class VeiculosService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<Veiculos> {
      return this.http.get<Veiculos>(`${API}/veiculos`);
    }

    show(id: number): Observable<Veiculo> {
      return this.http.get<Veiculo>(`${API}/veiculos/${id}`);
    }
  
    store(data: Veiculo){
      return this.http.post(`${API}/veiculos`,data);
    }
  
    update(data: Veiculo){
      return this.http.put(`${API}/veiculos/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/veiculos/${id}`);
    }
}