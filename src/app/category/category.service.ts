import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import endpoints from '../../config/endpoints';
import { Observable } from 'rxjs';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  constructor(private _httpClient: HttpClient) { }

  insert(category: Category): Observable<Category> {
    return this._httpClient.post<Category>(endpoints.categories.store, category);
  }

  get(idCategory): Observable<Category> {
    return this._httpClient.get<Category>(endpoints.categories.show(idCategory));
  }

  update(idCategory: string, category: Category): Observable<Category> {
    return this._httpClient.put<Category>(endpoints.categories.update(idCategory), category);
  }

  getAll(): Observable<Category[]> {
    return this._httpClient.get<Category[]>(endpoints.categories.index);
  }

  delete(idCategory: string): Observable<Category> {
    return this._httpClient.delete<Category>(endpoints.categories.destroy(idCategory));
  }
}
