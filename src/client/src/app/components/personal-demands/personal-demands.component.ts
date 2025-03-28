import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-personal-demands',
  imports: [CommonModule, FormsModule,],
  templateUrl: './personal-demands.component.html',
  styleUrl: './personal-demands.component.css'
})
export class PersonalDemandsComponent {
  companies : any[] = [{name: 'Company 1', id: 1}, {name: 'Company 2', id: 2}, {name: 'Company 3', id: 3},{name: 'Company 1', id: 1}, {name: 'Company 2', id: 2}, {name: 'Company 3', id: 3},{name: 'Company 1', id: 1}, {name: 'Company 2', id: 2}, {name: 'Company 3', id: 3},{name: 'Company 1', id: 1}, {name: 'Company 2', id: 2}, {name: 'Company 3', id: 3},{name: 'Company 1', id: 1}, {name: 'Company 2', id: 2}, {name: 'Company 3', id: 3},{name: 'Company 1', id: 1}, {name: 'Company 2', id: 2}, {name: 'Company 3', id: 3}];
}
