import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SpedComponent } from './pages/sped/sped.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth';

export const routes: Routes = [
  {path:'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path:'', component:LoginComponent}
];
