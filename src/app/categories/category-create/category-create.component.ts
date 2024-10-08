import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Category } from '../category.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css'],
  providers: [CategoryService], // add CategoryService to component's providers list to use it in this component.
})
export class CategoryCreateComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  addCategory(name: any): void {
    const category: Category = {
      id: -1, // Firebase assigns its own unique id automatically, so we don't need to set it here.
      name: name.value,
    };
    this.categoryService.createCategory(category).subscribe((data) => {
      this.router.navigate(['/products']);
    });
  }
}
