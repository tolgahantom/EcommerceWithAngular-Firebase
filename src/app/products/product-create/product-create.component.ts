import { Component, OnInit } from '@angular/core';
import { Category } from '../../categories/category.model';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { CategoryService } from '../../categories/category.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
  providers: [ProductService, CategoryService], // add CategoryRepository to component's providers list to use it in this component.
})
export class ProductCreateComponent implements OnInit {
  categories: Category[] = [];
  model: any = {
    categoryId: -1,
  };

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  ngOnInit(): void {}

  addProduct(form: NgForm) {
    const product: Product = {
      id: 1,
      name: this.model.name,
      price: this.model.price,
      imageUrl: this.model.photo,
      description: this.model.desc,
      isActive: this.model.isActive,
      categoryId: this.model.categoryId,
    };

    if (form.valid) {
      this.productService.createProduct(product).subscribe((data) => {
        this.router.navigate(['/products']);
      });
    } else {
      console.log('formu kontrol et');
    }
  }
}
