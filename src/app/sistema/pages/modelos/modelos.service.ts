import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { Modelo, Modelos } from "./modelos";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class ModelosService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<Modelos> {
      return this.http.get<Modelos>(`${API}/modelos`);
    }

    show(id: number): Observable<Modelo> {
      return this.http.get<Modelo>(`${API}/modelos/${id}`);
    }
  
    store(data: Modelo){
      return this.http.post(`${API}/modelos`,data);
    }
  
    update(data: Modelo){
      return this.http.put(`${API}/modelos/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/modelos/${id}`);
    }
}