import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { Cor, Cores } from "./cores";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class CoresService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<Cores> {
      return this.http.get<Cores>(`${API}/cores`);
    }

    show(id: number): Observable<Cor> {
      return this.http.get<Cor>(`${API}/cores/${id}`);
    }
  
    store(data: Cor){
      return this.http.post(`${API}/cores`,data);
    }
  
    update(data: Cor){
      return this.http.put(`${API}/cores/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/cores/${id}`);
    }
}