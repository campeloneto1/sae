import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { Estados } from "../estados/estados";
import { Pais, Paises } from "./paises";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class PaisesService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<Paises> {
      return this.http.get<Paises>(`${API}/paises`);
    }

    show(id: number): Observable<Pais> {
      return this.http.get<Pais>(`${API}/paises/${id}`);
    }

    where(id: number): Observable<Estados> {
      return this.http.get<Estados>(`${API}/paises/${id}/estados`);
    }
  
    store(data: Pais){
      return this.http.post(`${API}/paises`,data);
    }
  
    update(data: Pais){
      return this.http.put(`${API}/paises/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/paises/${id}`);
    }
}