import { Component, OnInit } from '@angular/core';
import { AuthService } from './authentication/auth.service';
import { HttpClient } from '@angular/common/http';
import { Product } from './products/product.model';

@Component({
  selector: '#app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private title = 'Home Page';
  updatedPrd: Product | null = null;

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
