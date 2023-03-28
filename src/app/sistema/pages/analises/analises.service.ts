import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { Analise, Analises } from "./analises";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class AnalisesService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<Analises> {
      return this.http.get<Analises>(`${API}/analises`);
    }

    show(id: number): Observable<Analise> {
      return this.http.get<Analise>(`${API}/analises/${id}`);
    }
  
    store(data: Analise){
      return this.http.post(`${API}/analises`,data);
    }
  
    update(data: Analise){
      return this.http.put(`${API}/analises/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/analises/${id}`);
    }
}