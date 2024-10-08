import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category } from './category.model';

@Injectable()
export class CategoryService {
  private url = 'https://angular-shopapp-15a9a-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/categories.json`).pipe(
      map((data) => {
        const categories: Category[] = [];

        for (const key in data) {
          categories.push({ ...data[key], id: key });
        }

        return categories;
      })
    );
  }

  getCategoryById(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this.url}/categories/${categoryId}.json`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.url}/categories.json`, category);
  }

  deleteCategory(categoryId: string) {
    console.log('delete category service works');
    console.log(categoryId);
    return this.http.delete(`${this.url}/categories/${categoryId}.json`);
  }

  editCategory(category: Category) {
    return this.http.patch(
      `${this.url}/categories/${category.id}.json`,
      category
    );
  }
}
