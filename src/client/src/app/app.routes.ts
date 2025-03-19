import { Routes } from '@angular/router';
import { SpedComponent } from './pages/sped/sped.component'
import { LoginComponent } from './pages/login/login.component'
import { AuthGuard } from './guards/auth'

export const routes: Routes = [
  {path:'SPED', component:SpedComponent, canActivate: [AuthGuard]},
  {path:'', component:LoginComponent}
];
