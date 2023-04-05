import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { Escolaridade, Escolaridades } from "./escolaridades";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class EscolaridadesService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<Escolaridades> {
      return this.http.get<Escolaridades>(`${API}/escolaridades`);
    }

    show(id: number): Observable<Escolaridade> {
      return this.http.get<Escolaridade>(`${API}/escolaridades/${id}`);
    }
  
    store(data: Escolaridade){
      return this.http.post(`${API}/escolaridades`,data);
    }
  
    update(data: Escolaridade){
      return this.http.put(`${API}/escolaridades/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/escolaridades/${id}`);
    }
}