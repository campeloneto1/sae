import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { CnhCategoria, CnhCategorias } from "./cnh-categorias";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class CnhCategoriasService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<CnhCategorias> {
      return this.http.get<CnhCategorias>(`${API}/cnh-categorias`);
    }

    show(id: number): Observable<CnhCategoria> {
      return this.http.get<CnhCategoria>(`${API}/cnh-categorias/${id}`);
    }
  
    store(data: CnhCategoria){
      return this.http.post(`${API}/cnh-categorias`,data);
    }
  
    update(data: CnhCategoria){
      return this.http.put(`${API}/cnh-categorias/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/cnh-categorias/${id}`);
    }
}