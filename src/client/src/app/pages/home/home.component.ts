import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { ProfileComponent } from '../../components/profile/profile.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ProfileComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  companies : any[] = [{name: 'Company 1', typeBD: 'local', docs: 'Fiscal/Contribuições', obs:'com inventario'}, {name: 'Company 2'}, {name: 'Company 3'}, {name: 'Company 4'}, {name: 'Company 5'},{name: 'Company 1'}, {name: 'Company 2'}, {name: 'Company 3'}, {name: 'Company 4'}, {name: 'Company 5'},{name: 'Company 1'}, {name: 'Company 2'}, {name: 'Company 3'}, {name: 'Company 4'}, {name: 'Company 5'}];
}
