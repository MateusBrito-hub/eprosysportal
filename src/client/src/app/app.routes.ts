import { Routes } from '@angular/router';
import { SpedComponent } from './pages/sped/sped.component'
import { LoginComponent } from './pages/login/login.component'

export const routes: Routes = [
  {path:'SPED', component:SpedComponent},
  {path:'', component:LoginComponent}
];
