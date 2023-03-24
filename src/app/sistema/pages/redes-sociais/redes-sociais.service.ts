import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { RedeSocial, RedesSociais } from "./redes-sociais";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class RedesSociaisService{
    constructor(private http: HttpClient) {}
  
    index(): Observable<RedesSociais> {
      return this.http.get<RedesSociais>(`${API}/redes-sociais`);
    }

    show(id: number): Observable<RedeSocial> {
      return this.http.get<RedeSocial>(`${API}/redes-sociais/${id}`);
    }
  
    store(data: RedeSocial){
      return this.http.post(`${API}/redes-sociais`,data);
    }
  
    update(data: RedeSocial){
      return this.http.put(`${API}/redes-sociais/${data.id}`,data);
    }
  
    destroy(id: number){
      return this.http.delete(`${API}/redes-sociais/${id}`);
    }
}