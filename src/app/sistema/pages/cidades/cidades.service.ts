import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { Cidade, Cidades } from "./cidades";

const API = environment.url;

@Injectable({providedIn: 'root'})

export class CidadesService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<Cidades> {
      return this.http.get<Cidades>(`${API}/cidades`);
    }

    show(id: number): Observable<Cidade> {
      return this.http.get<Cidade>(`${API}/cidades/${id}`);
    }
  
    store(data: Cidade){
      return this.http.post(`${API}/cidades`,data);
    }
  
    update(data: Cidade){
      return this.http.put(`${API}/cidades/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/cidades/${id}`);
    }
}