import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticleConfection } from '../models/article-confection';

@Injectable({
  providedIn: 'root'
})
export class ArticleConfectionService {

  private baseURL = "http://localhost:9090/api/articleconfections";

  constructor(private httpClient: HttpClient) { }

  getArticleConfectionListe(page:number=0,size:number=5): Observable<any>{
    return this.httpClient.get<ArticleConfection[]>(`${this.baseURL}?page=${page}&size=${size}`);
  }

  storeArticleConfection(articleconfection: ArticleConfection): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, articleconfection);
  }

  getArticleConfectionById(id: number): Observable<ArticleConfection>{
    return this.httpClient.get<ArticleConfection>(`${this.baseURL}/${id}`);
  }

  updateArticleConfection(id: number, articleconfection: ArticleConfection): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, articleconfection);
  }

  deleteArticleConfection(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
