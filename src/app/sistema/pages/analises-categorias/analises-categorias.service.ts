import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { AnaliseCategoria, AnalisesCategorias } from "./analises-categorias";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class AnalisesCategoriasService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<AnalisesCategorias> {
      return this.http.get<AnalisesCategorias>(`${API}/analises-categorias`);
    }

    show(id: number): Observable<AnaliseCategoria> {
      return this.http.get<AnaliseCategoria>(`${API}/analises-categorias/${id}`);
    }
  
    store(data: AnaliseCategoria){
      return this.http.post(`${API}/analises-categorias`,data);
    }
  
    update(data: AnaliseCategoria){
      return this.http.put(`${API}/analises-categorias/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/analises-categorias/${id}`);
    }
}