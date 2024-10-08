import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponse, AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  handleAuth(form: NgForm) {
    if (form.valid) {
      const email = form.value.email;
      const password = form.value.password;
      const { name, surname } = form.value;

      let authRespose: Observable<AuthResponse>;
      if (this.isLoginMode) {
        authRespose = this.authService.login(email, password);
      } else {
        authRespose = this.authService.register(email, password);
      }
      authRespose.subscribe({
        next: (res) => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.error = 'Bir hata oluştu : ';
          console.log(err.error.error);
          if (err.error.error.message) {
            switch (err.error.error.message) {
              case 'EMAIL_NOT_FOUND':
                this.error += 'E-posta bulunamadı';
                break;
              case 'INVALID_PASSWORD':
                this.error += 'E-posta veya şifre yanlış';
                break;
              case 'USER_DISABLED':
                this.error += 'Kullanıcı admin tarafından engellendi';
                break;
              case 'EMAIL_EXISTS':
                this.error += 'Bu e-posta zaten sisteme kayıtlı';
                console.log('buradasın');
                break;
              default:
                this.error +=
                  'Bilinmeyen bir hata oluştu lütfen daha sonra tekrar deneyiniz';
                break;
            }
          }
        },
      });
    } else {
      return;
    }
  }
}
