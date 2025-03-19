import axios from 'axios';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; // Importa o Router

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'jwt_token';

  constructor(private router: Router) { // Injeta o Router
    this.setupInterceptors();
  }

  async login(credentials: { email: string, password: string }): Promise<boolean> {
    try {
      const response = await axios.post<{ token: string }>('http://localhost:8080/auth/login', credentials);
      localStorage.setItem(this.tokenKey, response.data.token);

      // Redireciona o usuário após login bem-sucedido
      this.router.navigate(['/SPED']); // Substitua com a rota que você deseja redirecionar
      return true;
    } catch (error) {
      console.error("Erro no login:", error);
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    window.location.reload(); // Força o reload
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setupInterceptors(): void {
    axios.interceptors.request.use((config: any) => {
      const token = this.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    });
  }
}
