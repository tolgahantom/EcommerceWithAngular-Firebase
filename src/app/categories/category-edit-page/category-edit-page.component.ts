import { Component, OnInit } from '@angular/core';
import { Category } from '../category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-category-edit-page',
  templateUrl: './category-edit-page.component.html',
  styleUrls: ['./category-edit-page.component.css'],
  providers: [CategoryService], // Firebase servisi için inject edildi.
})
export class CategoryEditPageComponent implements OnInit {
  updatedCategory: Category;
  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router // Yeni kategoriyi yönlendirecek.
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const categoryId = params['categoryId'];
      console.log(categoryId);
      this.categoryService.getCategoryById(categoryId).subscribe((category) => {
        this.updatedCategory = {
          id: categoryId,
          name: category.name,
        };
      });
    });
  }

  updateCategory(categoryName: any) {
    const updatedCategory = {
      id: this.updatedCategory.id,
      name: categoryName.value,
    };

    this.categoryService.editCategory(updatedCategory).subscribe();
    this.router.navigate(['/']);
  }
}
