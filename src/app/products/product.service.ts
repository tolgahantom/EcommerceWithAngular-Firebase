import { Injectable } from '@angular/core';
import { Product } from '../products/product.model';
import { HttpClient } from '@angular/common/http';
import { exhaustMap, map, Observable, take, tap } from 'rxjs';
import { AuthService } from '../authentication/auth.service';

@Injectable()
export class ProductService {
  private url = 'https://angular-shopapp-15a9a-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // `https://angular-shopapp-15a9a-default-rtdb.firebaseio.com/categories/-O8MYhxUxxkYnmBe4kE6.json`  delete sorgusu
  // 'https://angular-shopapp-15a9a-default-rtdb.firebaseio.com/products/-O8G5q6SOX_TY4e5gAKi.json',    update sorgusu

  //-O8MYmTcZ0_6AvXRhhju

  getProducts(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/products.json`).pipe(
      map((result) => {
        const products: Product[] = [];
        for (const key in result) {
          if (categoryId) {
            if (categoryId === result[key].categoryId) {
              products.push({ ...result[key], id: key });
            }
          } else {
            products.push({ ...result[key], id: key });
          }
        }
        return products;
      })
    );
  }

  getProductById(id: any): Observable<Product> {
    return this.http.get<Product>(`${this.url}/products/${id}.json`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.authService.user.pipe(
      take(1),
      tap((user) => {
        console.log(user);
      }),
      exhaustMap((user) => {
        return this.http.post<Product>(
          `${this.url}/products.json?auth=?${user?.token}`,
          product
        );
      })
    );
  }
}
