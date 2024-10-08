import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService], // Firebase servisi için inject edildi.
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | null;
  loading: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((p) => {
      this.loading = true;
      this.productService.getProducts(p['categoryId']).subscribe((res) => {
        this.products = res;
        this.loading = false;
      });
    });
  }
}
