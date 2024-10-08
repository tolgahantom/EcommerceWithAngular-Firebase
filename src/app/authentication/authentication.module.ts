import { NgModule } from '@angular/core';
import { AuthComponent } from './auth/auth.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthComponent],
  exports: [AuthComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    RouterModule.forChild([{ path: 'account', component: AuthComponent }]),
  ],
})
export class AuthenticationModule {}
