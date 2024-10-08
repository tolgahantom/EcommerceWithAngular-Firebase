import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Category } from '../category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css'],
  providers: [CategoryService], // Firebase servisi için inject edildi.
})
export class CategoryEditComponent implements OnInit {
  categories: Category[] = [];
  updatedCategory: Category | null = null;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  deleteCategory(categoryId: string) {
    if (!confirm('Kategoriyi silmek istediğinize emin misini?')) {
      return;
    }
    this.categoryService.deleteCategory(categoryId).subscribe();
  }
}
