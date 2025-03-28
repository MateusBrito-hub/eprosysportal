import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-demands',
  imports: [CommonModule, FormsModule,],
  templateUrl: './demands.component.html',
  styleUrl: './demands.component.css'
})
export class DemandsComponent {
  companies : any[] = [{name: 'Company 1', id: 1}, {name: 'Company 2', id: 2}, {name: 'Company 3', id: 3},{name: 'Company 1', id: 1}, {name: 'Company 2', id: 2}, {name: 'Company 3', id: 3},{name: 'Company 1', id: 1}, {name: 'Company 2', id: 2}, {name: 'Company 3', id: 3},{name: 'Company 1', id: 1}, {name: 'Company 2', id: 2}, {name: 'Company 3', id: 3},{name: 'Company 1', id: 1}, {name: 'Company 2', id: 2}, {name: 'Company 3', id: 3},{name: 'Company 1', id: 1}, {name: 'Company 2', id: 2}, {name: 'Company 3', id: 3}]
}
