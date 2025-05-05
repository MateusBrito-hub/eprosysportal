import axios from 'axios';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../environments/enviroments';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.API_URI}/user`;
  private tokenKey = `${environment.JWT_TOKEN}`;

  constructor(private router: Router,@Inject(PLATFORM_ID) private platformId: Object) {
    this.setupInterceptors();
  }

  async login(credentials: { email: string, password: string }): Promise<boolean> {
    try {
      const response = await axios.post<{ token: string }>(`${this.apiUrl}/login`, credentials);
      localStorage.setItem(this.tokenKey, response.data.token);

      this.router.navigate(['/home']);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    window.location.reload();
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem(this.tokenKey);
    }
    return false;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getLoggedUser(): DecodedToken | null {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode<DecodedToken>(token);
      } catch (err) {
        console.error('Erro ao decodificar token', err);
        return null;
      }
    }
    return null;
  }

  private setupInterceptors(): void {
    axios.interceptors.request.use((config: any) => {
      const token = this.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }, (err) => {
      return Promise.reject(err);
    });
  }
}
