import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/products/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService], // add ProductService to component's providers list to use it in this component.
})
export class ProductComponent implements OnInit {
  product: Product | undefined;
  loading: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((p) => {
      const id = p['prdId'];
      this.loading = true;
      this.productService.getProductById(id).subscribe((prd) => {
        console.log(prd);
        this.product = prd;
        this.loading = false;
      });
    });
  }
}
