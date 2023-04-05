import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { Companhia, Companhias } from "./companhias";

const API = environment.url;

@Injectable({
    providedIn: 'root'
})

export class CompanhiasService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<Companhias> {
      return this.http.get<Companhias>(`${API}/companhias`);
    }

    show(id: number): Observable<Companhia> {
      return this.http.get<Companhia>(`${API}/companhias/${id}`);
    }
  
    store(data: Companhia){
      return this.http.post(`${API}/companhias`,data);
    }
  
    update(data: Companhia){
      return this.http.put(`${API}/companhias/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/companhias/${id}`);
    }
}