import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { User } from './user.model';

export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiKey = 'AIzaSyDslomoPwzPFH8kRrr5sRA3RW6Zdxtjf3I';
  url = `https://identitytoolkit.googleapis.com/v1/accounts:`;
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(this.url + 'signInWithPassword?key=' + this.apiKey, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        tap((res) => {
          this.handleUser(res.email, res.localId, res.idToken, res.expiresIn);
        })
      );
  }

  autoLogin() {
    if (localStorage.getItem('user') == null) return;

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const loadedUser = new User(
      user.email,
      user.id,
      user._token,
      user.expiresIn
    );

    if (loadedUser) {
      this.user.next(loadedUser);
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.user.next(null);
  }

  register(email: string, password: string) {
    return this.http
      .post<AuthResponse>(this.url + 'signUp?key=' + this.apiKey, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        tap((res) => {
          this.handleUser(res.email, res.localId, res.idToken, res.expiresIn);
          this.updateUser(
            'Tolgahan Tom',
            'https://fastly.picsum.photos/id/84/200/300.jpg?hmac=lG-wRB_G_4GA_bTdTnfV4BWUOOpf0g6gXeUeNyt1-uQ'
          );
        })
      );
  }

  handleUser(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: string
  ) {
    const user = new User(
      email,
      localId,
      idToken,
      new Date(new Date().getTime() + Number(expiresIn) * 1000)
    );

    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  updateUser(displayName: string, photoUrl: string) {
    const updatedUser = {
      displayName: displayName,
      photoURL: photoUrl,
    };
    this.http.post<any>(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=' +
        this.apiKey,
      updatedUser
    );
  }
}
