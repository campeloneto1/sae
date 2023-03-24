import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { Modelos } from "../modelos/modelos";
import { Marca, Marcas } from "./marcas";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class MarcasService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<Marcas> {
      return this.http.get<Marcas>(`${API}/marcas`);
    }

    show(id: number): Observable<Marca> {
      return this.http.get<Marca>(`${API}/marcas/${id}`);
    }

    where(id: number): Observable<Modelos> {
      return this.http.get<Modelos>(`${API}/marcas/${id}/modelos`);
    }
  
    store(data: Marca){
      return this.http.post(`${API}/marcas`,data);
    }
  
    update(data: Marca){
      return this.http.put(`${API}/marcas/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/marcas/${id}`);
    }
}