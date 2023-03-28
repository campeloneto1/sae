import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { ArquivoTipo, ArquivosTipos } from "./arquivos-tipos";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class ArquivosTiposService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<ArquivosTipos> {
      return this.http.get<ArquivosTipos>(`${API}/arquivos-tipos`);
    }

    show(id: number): Observable<ArquivoTipo> {
      return this.http.get<ArquivoTipo>(`${API}/arquivos-tipos/${id}`);
    }

    store(data: ArquivoTipo){
      return this.http.post(`${API}/arquivos-tipos`,data);
    }
  
    update(data: ArquivoTipo){
      return this.http.put(`${API}/arquivos-tipos/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/arquivos-tipos/${id}`);
    }
}