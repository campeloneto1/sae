import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { VeiculoArquivo, VeiculosArquivos } from "./veiculos-arquivos";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class VeiculosArquivosService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<VeiculosArquivos> {
      return this.http.get<VeiculosArquivos>(`${API}/veiculos-arquivos`);
    }

    show(id: number): Observable<VeiculoArquivo> {
      return this.http.get<VeiculoArquivo>(`${API}/veiculos-arquivos/${id}`);
    }    
  
    store(data: VeiculoArquivo){
      return this.http.post(`${API}/veiculos-arquivos`,data);
    }
  
    update(data: VeiculoArquivo){
      return this.http.put(`${API}/veiculos-arquivos/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/veiculos-arquivos/${id}`);
    }  
}