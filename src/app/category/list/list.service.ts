import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import endpoints from '../../../config/endpoints';
import { Observable } from 'rxjs';
import { List } from './list';

@Injectable({
  providedIn: 'root'
})

export class ListService {

  constructor(private httpClient: HttpClient) { }

  insert(idCategory: string, list: List): Observable<List> {
    return this.httpClient.post<List>(endpoints.lists.store(idCategory), list);
  }

  get(idCategory: string, idList: string): Observable<List> {
    return this.httpClient.get<List>(endpoints.lists.show(idCategory, idList));
  }

  update(idCategory: string, idList: string, list: List): Observable<List> {
    return this.httpClient.put<List>(endpoints.lists.update(idCategory, idList), list);
  }

  getAll(idCategory: string): Observable<List[]> {
    return this.httpClient.get<List[]>(endpoints.lists.index(idCategory));
  }

  delete(idCategory: string, idList: string): Observable<List> {
    return this.httpClient.delete<List>(endpoints.lists.destroy(idCategory, idList));
  }

}
