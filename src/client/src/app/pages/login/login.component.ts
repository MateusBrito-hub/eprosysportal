import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/user.service'

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user = { email: '', password: '' };

  constructor(private authService: AuthService){}

  auth(): void {
    this.authService.login(this.user)
      .then(response => {
        return response
      })
      .catch(err => console.error("Erro no login", err));
  }
}
