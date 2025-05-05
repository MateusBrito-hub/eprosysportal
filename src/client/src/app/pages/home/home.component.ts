import { Component } from '@angular/core';
import { ProfileComponent } from '../../components/profile/profile.component';
import { PersonalDemandsComponent } from '../../components/personal-demands/personal-demands.component'
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProfileComponent,PersonalDemandsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
