import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      // Burada user'ın var olup olmadığını kontrol ediyoruz. User eğer null ise ! ile aldığımız zaman false gelir tekrar ! aldığımız durumda false is true true ise false gelir.
      this.isAuthenticated = !!user;
      this.isAdmin = user?.email == 'tolgahantom@gmail.com';
    });
  }

  logout() {
    this.authService.logout();
  }
}
