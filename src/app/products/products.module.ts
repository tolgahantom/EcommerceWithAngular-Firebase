import { NgModule } from '@angular/core';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminGuard } from '../authentication/admin-guard';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ProductListComponent },
      {
        path: 'create',
        component: ProductCreateComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'category/:categoryId',
        component: ProductListComponent,
      },
      { path: ':prdId', component: ProductComponent },
    ],
  },
];

@NgModule({
  declarations: [
    ProductCreateComponent,
    ProductComponent,
    ProductListComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [ProductCreateComponent, ProductComponent, ProductListComponent],
})
export class ProductModule {}
