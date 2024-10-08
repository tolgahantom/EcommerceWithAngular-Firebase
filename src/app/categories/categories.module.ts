import { NgModule } from '@angular/core';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryEditPageComponent } from './category-edit-page/category-edit-page.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminGuard } from '../authentication/admin-guard';

@NgModule({
  declarations: [
    CategoryCreateComponent,
    CategoryEditComponent,
    CategoryEditPageComponent,
    CategoryListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: 'category/create',
        component: CategoryCreateComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'category/edit',
        component: CategoryEditComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'category/:categoryId',
        component: CategoryEditPageComponent,
        canActivate: [AdminGuard],
      },
    ]),
  ],
  exports: [
    CategoryCreateComponent,
    CategoryEditComponent,
    CategoryEditPageComponent,
    CategoryListComponent,
  ],
})
export class CategoriesModule {}
