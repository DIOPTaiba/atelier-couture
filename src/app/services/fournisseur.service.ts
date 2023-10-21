import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fournisseur } from '../models/forunisseur';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  private baseURL = "http://localhost:9090/api/fournisseurs";
  constructor(private httpClient: HttpClient) { }

  getFournisseurListe(): Observable<any>{
    return this.httpClient.get<Fournisseur[]>(`${this.baseURL}`);
  }
}
