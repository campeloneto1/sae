import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { AnaliseTipo, AnalisesTipos } from "./analises-tipos";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class AnalisesTiposService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<AnalisesTipos> {
      return this.http.get<AnalisesTipos>(`${API}/analises-tipos`);
    }

    show(id: number): Observable<AnaliseTipo> {
      return this.http.get<AnaliseTipo>(`${API}/analises-tipos/${id}`);
    }
  
    store(data: AnaliseTipo){
      return this.http.post(`${API}/analises-tipos`,data);
    }
  
    update(data: AnaliseTipo){
      return this.http.put(`${API}/analises-tipos/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/analises-tipos/${id}`);
    }
}