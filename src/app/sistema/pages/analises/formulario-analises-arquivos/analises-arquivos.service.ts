import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { AnaliseArquivo, AnalisesArquivos } from "./analises-arquivos";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class AnalisesArquivosService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<AnalisesArquivos> {
      return this.http.get<AnalisesArquivos>(`${API}/analises-arquivos`);
    }

    show(id: number): Observable<AnaliseArquivo> {
      return this.http.get<AnaliseArquivo>(`${API}/analises-arquivos/${id}`);
    }    
  
    store(data: AnaliseArquivo){
      return this.http.post(`${API}/analises-arquivos`,data);
    }
  
    update(data: AnaliseArquivo){
      return this.http.put(`${API}/analises-arquivos/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/analises-arquivos/${id}`);
    }  
}