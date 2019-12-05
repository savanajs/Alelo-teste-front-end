import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import endpoints from '../../../../config/endpoints';
import { Observable } from 'rxjs';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})

export class ItemService {

  constructor(private httpClient: HttpClient) { }

  insert(idCategory: string, idList: string, item: Item): Observable<Item> {
    return this.httpClient.post<Item>(endpoints.items.store(idCategory, idList), item);
  }

  get(idCategory: string, idList: string, idItem: string): Observable<Item> {
    return this.httpClient.get<Item>(endpoints.items.show(idCategory, idList, idItem));
  }

  update(idCategory: string, idList: string, idItem: string, item: Item): Observable<Item> {
    return this.httpClient.put<Item>(endpoints.items.update(idCategory, idList, idItem), item);
  }

  getAll(idCategory: string, idList: string): Observable<Item[]> {
    return this.httpClient.get<Item[]>(endpoints.items.index(idCategory, idList));
  }

  delete(idCategory: string, idList: string, idItem: string): Observable<Item> {
    return this.httpClient.delete<Item>(endpoints.items.destroy(idCategory, idList, idItem));
  }

}
