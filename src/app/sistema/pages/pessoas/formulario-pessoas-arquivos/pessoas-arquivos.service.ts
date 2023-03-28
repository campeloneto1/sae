import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { PessoaArquivo, PessoasArquivos } from "./pessoas-arquivos";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class PessoasArquivosService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<PessoasArquivos> {
      return this.http.get<PessoasArquivos>(`${API}/pessoas-arquivos`);
    }

    show(id: number): Observable<PessoaArquivo> {
      return this.http.get<PessoaArquivo>(`${API}/pessoas-arquivos/${id}`);
    }    
  
    store(data: PessoaArquivo){
      return this.http.post(`${API}/pessoas-arquivos`,data);
    }
  
    update(data: PessoaArquivo){
      return this.http.put(`${API}/pessoas-arquivos/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/pessoas-arquivos/${id}`);
    }  
}