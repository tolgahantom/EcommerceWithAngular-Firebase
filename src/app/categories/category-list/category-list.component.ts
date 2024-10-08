import { Component, OnInit } from '@angular/core';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  providers: [CategoryService], // Firebase servisi için inject edildi.
})
export class CategoryListComponent implements OnInit {
  categories: Category[];
  displayAll = true;
  selectedCategory: Category | null;

  constructor(private categoryService: CategoryService) {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  ngOnInit(): void {}

  selectCategory(category: Category) {
    if (this.selectedCategory) {
      this.selectedCategory = null;
    } else {
      this.selectedCategory = category;
      this.displayAll = false;
    }
  }
}
