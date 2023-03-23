import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { Influencia, Influencias } from "./influencias";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class InfluenciasService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<Influencias> {
      return this.http.get<Influencias>(`${API}/influencias`);
    }

    show(id: number): Observable<Influencia> {
      return this.http.get<Influencia>(`${API}/influencias/${id}`);
    }
  
    store(data: Influencia){
      return this.http.post(`${API}/influencias`,data);
    }
  
    update(data: Influencia){
      return this.http.put(`${API}/influencias/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/influencias/${id}`);
    }
}