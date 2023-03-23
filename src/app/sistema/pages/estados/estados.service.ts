import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { Cidades } from "../cidades/cidades";
import { Estado, Estados } from "./estados";

const API = environment.url;

@Injectable({
    providedIn: 'root'
})

export class EstadosService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<Estados> {
      return this.http.get<Estados>(`${API}/estados`);
    }

    where(id: number): Observable<Cidades> {
      return this.http.get<Cidades>(`${API}/estados/${id}/cidades`);
    }

    show(id: number): Observable<Estado> {
      return this.http.get<Estado>(`${API}/estados/${id}`);
    }
  
    store(data: Estado){
      return this.http.post(`${API}/estados`,data);
    }
  
    update(data: Estado){
      return this.http.put(`${API}/estados/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/estados/${id}`);
    }
}