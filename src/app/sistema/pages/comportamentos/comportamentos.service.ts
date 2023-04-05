import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { Comportamento, Comportamentos } from "./comportamentos";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class ComportamentosService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<Comportamentos> {
      return this.http.get<Comportamentos>(`${API}/comportamentos`);
    }

    show(id: number): Observable<Comportamento> {
      return this.http.get<Comportamento>(`${API}/comportamentos/${id}`);
    }
  
    store(data: Comportamento){
      return this.http.post(`${API}/comportamentos`,data);
    }
  
    update(data: Comportamento){
      return this.http.put(`${API}/comportamentos/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/comportamentos/${id}`);
    }
}