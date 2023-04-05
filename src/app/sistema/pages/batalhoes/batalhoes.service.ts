import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { Companhias } from "../companhias/companhias";
import { Batalhao, Batalhoes } from "./batalhoes";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class BatalhoesService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<Batalhoes> {
      return this.http.get<Batalhoes>(`${API}/batalhoes`);
    }

    show(id: number): Observable<Batalhao> {
      return this.http.get<Batalhao>(`${API}/batalhoes/${id}`);
    }

    companhias(id: number): Observable<Companhias> {
      return this.http.get<Companhias>(`${API}/batalhoes/${id}/companhias`);
    }
  
    store(data: Batalhao){
      return this.http.post(`${API}/batalhoes`,data);
    }
  
    update(data: Batalhao){
      return this.http.put(`${API}/batalhoes/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/batalhoes/${id}`);
    }
}